import axios from "axios";

const API_ENDPOINT = 'http://127.0.0.1';

const MyAPI = {
    async get(url, token = null) {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`${API_ENDPOINT}${url}`, { headers });
            return { status: response.status, data: response.data };
        } catch (error) {
            return { status: error.response?.status || 501, error: error.message };
        }
    },
    async post(url, data, token = null) {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.post(`${API_ENDPOINT}${url}`, data, { headers });
            return { status: response.status, data: response.data };
        } catch (error) {
            return { status: error.response?.status || 500, error: error.message };
        }
    },
    async put(url, data, token = null) {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.put(`${API_ENDPOINT}${url}`, data, { headers });
            return { status: response.status, data: response.data };
        } catch (error) {
            return { status: error.response?.status || 500, error: error.message };
        }
    }
};

export const Item = {
    setItem(item_name,value) {
        sessionStorage.setItem(item_name, value);
    },
    getItem(item_name) {
        return sessionStorage.getItem(item_name);
    }
};

export const FormatDate = (date, formatString) => {
    const myDate = new Date(date);
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, '0');
    const day = String(myDate.getDate()).padStart(2, '0');

    const dateFormats = {
        'dd-mm-yyyy': `${day}-${month}-${year}`,
        'dd/mm/yyyy': `${day}/${month}/${year}`,
        'mm-dd-yyyy': `${month}-${day}-${year}`,
        'mm/dd/yyyy': `${month}/${day}/${year}`,
        'yyyy-dd-mm': `${year}-${day}-${month}`,
        'yyyy/mm/dd': `${year}/${month}/${day}`
    };

    return dateFormats[formatString];
};

export const  calculatePercentage = (totalClasses, presentClasses) => {
    if (totalClasses > 0 && presentClasses >= 0) {
        let percentage = (presentClasses / totalClasses) * 100;
        return percentage.toFixed(2);
    } else {
        return null;
    }
}

export const FormattedTime = (time, format) => {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    };

    const now = new Date(time);
    const formattedTime = now.toLocaleString('en-US', options);

    return formattedTime;
};

export const parseTime = (timeString) => {
    const [hh, mm, ss] = timeString.split(':').map(Number);
    return { hours: hh, minutes: mm, seconds: ss };
}


export default MyAPI;
