const axios = require('axios');

class DoorBird 
{
    /*
        * Create a new instance of DoorBird.
        * @param {string} ip The ip of the doorbird LAN server.
        * @param {string} username The username of the doorbird LAN server.
        * @param {string} password The password of the doorbird LAN server.
        * @return {DoorBird} The new instance of DoorBird.
    */
    constructor(ip, username, password)
    {
        this.ip = ip;
        this.username = username;
        this.password = password;
    }

    /*
        * Turn the light on
        * @return {boolean} true on succes, false on failure.
    */
    async turnLightOn() 
    {
        let result;

        await axios.get(`http://${this.ip}/bha-api/light-on.cgi?http-user=${this.username}&http-password=${this.password}`)
            .then((res) => {
                result = res.data.BHA.RETURNCODE === "1";
            })
            .catch((err) => {
                result = false;
            });

        return result;
    }
}

module.exports = DoorBird;