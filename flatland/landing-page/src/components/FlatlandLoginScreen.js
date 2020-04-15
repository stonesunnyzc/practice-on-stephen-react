import React, { Component } from 'react';
import { LoginScreen } from '@nokia-csf-uxr/csfWidgets';
import flatland from "../apis/flatland";

const languageList = [
    {
        label: 'English',
        value: '1'
    }, {
        label: 'Swedish',
        value: '2'
    }, {
        label: 'Finnish',
        value: '3'
    }, {
        label: 'Spanish',
        value: '4'
    }, {
        label: 'Russian',
        value: '5'
    }, {
        label: 'French',
        value: '6'
    }, {
        label: 'Italian',
        value: '7'
    }, {
        label: 'Hindi',
        value: '8'
    }
];

const languageLabel = 'Language';
const languagePlaceholderText = 'Select one';

class FlatlandLoginScreen extends Component { //eslint-disable-line
    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true,
            username: '',
            password: ''
        };
    }

    onUserNameChange = (data) => {
        const { value } = data;
        console.log('Username change: ', data); // eslint-disable-line no-console
        this.setState({
            username: value,
            buttonDisabled: (this.state.password.length === 0 || value.length === 0),
            notificationType: undefined,
            notificationMessage: undefined,
            usernameError: false,
            passwordError: false,
        });
    }

    onPasswordChange = (data) => {
        const { value } = data;
        console.log('Password change: ', data); // eslint-disable-line no-console
        this.setState({
            password: value,
            buttonDisabled: (this.state.username.length === 0 || value.length === 0),
            notificationType: undefined,
            notificationMessage: undefined,
            usernameError: false,
            passwordError: false,
        });
    }

    onRememberUserChange = (event) => {
        console.log('Remember User: ', event); // eslint-disable-line no-console
        this.setState({
            rememberUser: event.value
        });
    }

    onButtonClick = (event) => {
        event.nativeEvent.preventDefault(); // prevent form form submitting/ going to new page
        console.log('Sign In button click: ', event); // eslint-disable-line no-console
        this.setState({
            buttonLoading: true,
            passwordDisabled: true,
            userNameDisable: true
        }, () => {
            setTimeout(async () => {
                this.setState({
                    passwordDisabled: false,
                    userNameDisable: false,
                    buttonLoading: false,
                    notificationType: 'info',
                    notificationMessage: 'You are now logged in.',
                });

                await flatland.post("/login.html?j_username=adminuser&j_password=password");
                const applicationsData = await flatland.post("/rest/webfwk/applications");
                console.log(applicationsData);

            }, 3000);
        });
    }

    onLanguageSelection = (data) => {
        console.log('Your selected language: ', data); // eslint-disable-line no-console
    }

    render() {
        const passwordProps = {
            onChange: this.onPasswordChange,
            css: {
                error: this.state.passwordError,
                disabled: this.state.passwordDisabled,
            },
            text: this.state.password,
        };

        const userNameProps = {
            onChange: this.onUserNameChange,
            css: {
                error: this.state.usernameError,
                disabled: this.state.userNameDisable,
            },
            text: this.state.username
        };

        const buttonProps = {
            disabled: this.state.buttonDisabled,
            onClick: this.onButtonClick
        };

        const loginScreenProps = {
            productName: 'Test Product',
            productDescription: 'This is stateful test component for login screen',
            marketingMessage: 'Example of a successful login case including the validation logic and actions of the login screen.',
            versionNumber: '18.5',
            copyrightYear: new Date().getFullYear(),
            notificationType: this.state.notificationType,
            notificationMessage: this.state.notificationMessage,
            onRememberUserChange: this.onRememberUserChange,
            rememberUser: this.state.rememberUser,
            showRememberUser: true,
            showLanguageSelection: true,
            languageList,
            languageLabel,
            languagePlaceholderText,
            onLanguageSelection: this.onLanguageSelection,
            passwordProps,
            userNameProps,
            buttonProps,
            buttonLoading: this.state.buttonLoading,
        };

        return (
            <LoginScreen {...loginScreenProps} />
        );
    }
}

export default FlatlandLoginScreen;