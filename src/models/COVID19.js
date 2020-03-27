import axios from 'axios';
import moment from 'moment';
const API="https://covidapi.info/api/v1";
const ApiExtensions = {
    LATEST : 'global',
    COUNTRY : 'country',
    SOURCES : 'sources'
}

class COVID19 {

     async getLatest(){
        try {
            let res = await axios.get(`${API}/${ApiExtensions.LATEST}`);
            console.log(res.data.result);
            return res.data.result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
     async getByCountry(ISOcode){
         let today=moment().day(-1).format('YYYY-MM-DD');
         let fromDate = moment(`01-${moment().month()+1}-${moment().year()}`, 'DD-MM-YYYY').format('YYYY-MM-DD');
         console.log("date",fromDate,today);
         
              try {
            let res = await axios.get(`${API}/${ApiExtensions.COUNTRY}/${ISOcode}`);
              console.log(res.data.result);
              return res.data.result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
const covid19 = new COVID19();

export default covid19;