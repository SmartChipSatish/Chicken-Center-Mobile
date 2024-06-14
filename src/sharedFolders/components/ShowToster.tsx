import React from 'react';

export const ShowToster = (toast: any, title: string, subTitle: string, type: string) => {
    toast.hideAll();
    toast.show(title, {
        type: 'custom_type',
        data: {
            title: subTitle,
            type: type,
            sideColor: type === 'success'? 'green' : 'red'
        },
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
    });
}

