module.exports = { 
    /**
     * Randomize array in-place using Durstenfeld shuffle algorithm
     * 
     * @param array - Array to be shuffled 
     * @output - return the shuffled array
     */
    shuffleArray: function(array){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },

    /**
     * Return first element of an array and the modified array after 
     * removing the first element
     * @param array - Array with all questions id from our DB
     * @output - Current question id and modified array of questions ids
     */
    questionTracker: function(array){
        //Retrieve current question id
        let questionId = array[0];

        //Remove question id from array
        array.shift();

        //Return question id and modified array
        return [questionId, array];

    },

    /**
     * Create an user Object from a RowDataPacket from a sql SELECT query
     * @param RowDataPacket - One element RowDataPacket retrieved from users table (MySQL database)
     * @output - user Object { id, givenName, familyName}
     */
    createUserObject: function(RowDataPacket){
        //Insert RowDataPacket elements inside user Object
        let user = {
            id: RowDataPacket[0].id,
            givenName: RowDataPacket[0].givenName,
            familyName: RowDataPacket[0].familyName
        }; 

        //return user Object
        return user
    },

    /**
     * Change the Date() format to DD/MM/YYYY format 
     * @output - Date with format DD/MM/YYYY
     */
    getFormattedDate: function() {        
        let todayTime = new Date();
        let month = todayTime.getMonth() + 1;       
        let day = todayTime.getDate();        
        let year = todayTime.getFullYear();
        
        let formattedDate = month < 10 ? day + "/0" + month + "/" + year : day + "/" + month + "/" + year;

        return formattedDate;
    },

    /**
     * Given a time in seconds, return the time in HH:MM:SS format
     * If time is less than an hour, return the time in MM:SS format
     * @param time - time in seconds
     * @output - formatted time as HH:MM:SS or MM:SS if less than an hour
     */
    FormattedTime: function(time){
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 3600 % 60);

        //format single digit minutes and seconds
        var f_m = m < 10 ? "0" + m : m;
        var f_s = s < 10 ? "0" + s : s;
        
        //format less than an hour time
        var formattedTime = h > 0 ? h + ":" + f_m + ":" + f_s : f_m + ":" + f_s;

        return formattedTime;
    }
};