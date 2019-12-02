import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Camera, Permissions } from 'expo';


/*
* formats the inputted number to standard phone number format
* @param: number that will be formatted
* */
export const formatNum = num => {
    num = num.replace(/\D/g, '');
    if (num.length === 10)
        return `(${num[0]}${num[1]}${num[2]})-${num[3]}${num[4]}${num[5]}-${num[6]}${num[7]}${num[8]}${num[9]}`;
    else
        return '';
};

export default class Scanner extends React.Component {
    // hasCameraPermission: whether or not the camera can be used
	// contact: object representing a business contact
	// name: the contact's first and last name
	// email: the contact's email address
	// phone: the contact's phone number
	// cardImage: the contact's business card image
	// isLoading: true if we are awaiting a fetch request
	state = {
        hasCameraPermission: null, 
        contact: {
            name: null,
            email: null,
            number: null,
			cardImage: null,
        },
		isLoading: false,
    };

	// asks permission to use the camera
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.updatePermission(status);
    }

	// checks if the name attribute has changed,
	// which means an image was correctly processed,
	// updates the state and navigates to confirmation screen
    componentDidUpdate(prevProps, prevState) {
      if(this.state.contact.name !== prevState.contact.name) {
		  this.stopLoading();
          this.props.sendToConfirm(this.state.contact);
      }
    }
	
	// changes isLoading attribute to stop the loading animation
	stopLoading = () => {
		this.setState({ isLoading: false });
	};

	// updates the app's camera permissions to granted/denied
	// @param: status of the camera permission request
    updatePermission = (status) => {
      this.setState({ hasCameraPermission: status === 'granted' });
    };

	// capitalizes the first and last name in the given full name
	// @param: full name that will be reformatted
	// @return: formatted name
    capName = (name) => {
        return name.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

	// extracts the contact's phone number from the given text string.
	// takes into account different phone number formats.
	// @param: text string that will be searched for the number
	// @return: phone number
    extractNumber = (text) => {
        let arr = text.filter(item =>
            item.toLowerCase().includes("phone"));
        if (arr.length === 0)
            arr = text.filter(item =>
                item.toLowerCase().includes("p"));
        if (arr.length === 0)
            arr = text.filter(item =>
            item.toLowerCase().includes("direct"));
        if (arr.length === 0)
            arr = text.filter(item =>
            item.toLowerCase().includes("main"));
        if (arr.length === 0)
            arr = text.filter(item =>
            item.toLowerCase().includes("mobile"));
        if (arr.length === 0)
            arr = text.filter(item =>
                item.replace(/\D/g, '').length === 10).filter(item =>
                item.toLowerCase().includes("fax") === false);

        let num = arr.map(item => {
            if (item.includes(":")) {
                let number = item.split(":");
                return number.filter(subItem =>
                    subItem.includes("-") || subItem.includes("."))
            } else { return item }
        })[0].trim();
        num = num.replace(/\D/g, '');
        return num;
    };



	// extracts the name, email, and phone number of a contact
	// from the inputted json object;
	// updates the state with the new contact information
	// @param: object representing the text on the business card
    _handleResponse = (json) => {
        let text = json.responses[0].textAnnotations[0].description.split('\n');

        let emailField = text.filter(item =>
            item.includes('@')).map(item =>
                item.split(" ").filter(subItem =>
                    subItem.includes('@')))[0][0].trim();

        let num = this.extractNumber(text);

        // temporary (for testing)
        let cName = text.filter(item =>
            item.includes("Ross Martin") ||
            item.includes("Tony Russell Diamond") ||
            item.includes("Tom Rapa") ||
            item.includes("Vicki Chase") ||
            item.includes("Brian Michalsen")
        )[0];

        // actual implementation
        /*let cName = text.filter(item =>
            item.includes(",")).filter(item => !/\d/.test(item)).map(item =>
                item.split(","))[0][0].toLowerCase();*/

        cName = this.capName(cName);

        this.setState({ contact: {
            ...this.state.contact,
            name: cName,
            email: emailField,
            number: num
        }});

    };

	// extracts a contact's name, email, and phone number
	// from the given data
	// @param: data that will be processed
    _handleQRCode = data => {
        let fields = JSON.stringify(data).split(",")[1].split("||");
        let name = fields[0].split("name:")[1];
        let email = fields[1].split("email:")[1];
        let number = fields[2].split("number:")[1].replace(/\D/g, '');

        this.setState({ contact: {
            ...this.state.contact,
            name: name,
            email: email,
            number: formatNum(number),
        }})
    };

	// called on screen press, takes a picture of the current screen,
	// makes a request to Google Cloud Vision for text recognition,
	// and calls reponse processing methods
    takePicture = () => {
        this.setState({ isLoading: true });
        this.camera.takePictureAsync({
          quality: 0.1,
          base64: true,
          exif: false,
        }).then(photo => {
                this.setState({ contact: { ...this.state.contact, cardImage: photo }});
                let url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCIx4IUfSSHgEyEdChmmMgb5ycXPB8Qn2U";
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        requests: [
                            {
                                image: { content: photo.base64 },
                                features: [{ type: "TEXT_DETECTION" }],
                                imageContext: { languageHints: ["en"] }
                            }
                        ]
                    })
                }).then(res => res.json()).then(json => this._handleResponse(json))
                /*.catch( () => {
                    this.setState({ isLoading: false});
                    alert("Invalid Picture\nPlease Try Again");
                })*/
            })

    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
              <View style={{ flex: 1 }}>
                <Camera
                    style={{ flex: 1 }}
                    type={ Camera.Constants.Type.back }
                    ref={ cam => this.camera = cam }
                    flashMode={ Camera.Constants.FlashMode.auto }
                    onBarCodeScanned={ this._handleQRCode } >
                    <TouchableOpacity
                        style={{ flex: 1}}
                        onPressIn={ this.takePicture }
                    >
                    <ActivityIndicator
                        size={ "large" }
                        style={ styles.loading }
                        animating={ this.state.isLoading }
                    />
                    </TouchableOpacity>
                </Camera>
              </View>
          );
        }
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: "black",
    }
});
