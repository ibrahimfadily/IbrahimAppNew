const domain = 'https://appserveribrahim.onrender.com';

const appFetch = async (route, method, body) => {
    const url = domain + route;

    const params = {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        params.body = JSON.stringify(body);

    }
    return await fetch(url, params)
        .then(res => {

            console.log("res status: ", res.status);
            return res.json()
        })
        .then(resjson => resjson)
        .catch(e => console.log("fetch error: ", e))
}


export const login = async (body) => {
    const route = '/Login';
    console.log(body);
    return await appFetch(route, 'POST', body)
};


export const SignUp = async (body) => {
    // const route = '/Login' ; 
    const route = '/SignUp';
    console.log("body : ", body);
    return await appFetch(route, 'POST', body)
};


export const ForgotPassword = async (body) => {
    const route = '/updatepasswordByID';
    console.log(body);
    return await appFetch(route, 'PATCH', body)
};


export const handleAppointmenCarWashtRegistration = async (selectedDate, selectedTime) => {
    try {
        const route = '/handleAppointmenCarWashtRegistration';
        const body = { selectedDate, selectedTime }; // Updated to pass selectedDate and selectedTime directly
        const response = await appFetch(route, 'POST', body);
        console.log('Appointment CarWash registered:', response);
        // Additional logic for handling the appointment registration
        // ...
        return response;
    } catch (error) {
        console.error('Error registering appointment CarWash:', error);
        throw error;
    }
};


export const handleAppointmentTEZTRegistration = async (selectedDate, selectedTime) => {
    try {
        const route = '/handleAppointmentTEZTRegistration ';
        const body = { selectedDate, selectedTime }; // Updated to pass selectedDate and selectedTime directly
        const response = await appFetch(route, 'POST', body);
        console.log('Appointment TEZT registered:', response);
        // Additional logic for handling the appointment registration
        // ...
        return response;
    } catch (error) {
        console.error('Error registering appointment TEZT:', error);
        throw error;
    }
};


export const UserInformation = async (idNumber, carNumber, carType, price) => {
    try {
        const route = '/UserInformation';
        const body = { idNumber, carNumber, carType, price };
        const response = await appFetch(route, 'POST', body);
        console.log('UserInformation  successful:', response);

        return response;
    } catch (error) {
        console.error('Error sending user info:', error);
        throw error;
    }
};


export const CarWash = async (carType, washType, price) => {
    try {
        const route = '/CarWash'; // Assuming this is the correct endpoint for your CarWash API
        const body = { carType, washType, price };
        const response = await appFetch(route, 'POST', body);
        console.log('CarWash successful:', response);

        return response;
    } catch (error) {
        console.error('Error sending user info:', error);
        throw error;
    }
};


export const processPayment = async (amount, currency, cardNumber, expiry, cvv) => {
    try {
        // Check if all requirements are registered
        if (!amount || !currency || !cardNumber || !expiry || !cvv) {
            // alert('Please fill in all payment details.');
            return;
        }

        const route = '/processPayment'; // Assuming this is the correct endpoint for your CarWash API
        const body = { amount, currency, cardNumber, expiry, cvv };
        const response = await appFetch(route, 'POST', body);
        console.log('Payment successful:', response);

        return response;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};




