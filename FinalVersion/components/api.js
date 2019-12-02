
/*
 * Function that capitalizes the first letter of a name.
 * @param name - A string seperated by spaces.
 * @return A new name with the letters capitalized.
 */
const capName = (name) => {
    return name.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

/*
 * Function that processes contacts from the API call. It
 * will create a contact object by assigning it specific variables
 * from the API call.
 * @param user - the entire user object from the API call. (Contains
 * a lot of useless information.
 * @return a formatted contact object.
 */
const processContacts = (user) => {
    let name = `${user.name.first} ${user.name.last}`;
    return {
        name: capName(name),
        number: user.phone,
        email: user.email,
        id: id++,
    }
};

let id = 0;

/*
 * Function to add a key to a value.
 */
const addKeys = (val, key) => ({ key, ...val });

/*
 * Function that pings the Random User API to get a random
 * user object.
 * @return A formatted random user object.
 */
export const fetchContacts = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=20&nat=us');
        const {results} = await response.json();
        return results.map(processContacts).map(addKeys);
    }
    catch (err) {
        console.log(err);
    }
};