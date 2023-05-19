import React from "react";
import axios from "axios";
import {baseUrl} from "../../baseUrl";

export const signInAPI = (data) => {
    return new Promise(function (resolve, reject) {
        axios.post(`${baseUrl}/api/user`, null, {
            params: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {

            console.log(response);
            // if (response.data.user.role !== 'Admin') {
            //     throw {
            //         response: {
            //             data: {
            //                 error_description: "You are not authorized to login with this app"
            //             }
            //         }
            //     };
            // }
            // resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });
}
