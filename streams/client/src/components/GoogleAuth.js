import React from "react";

class GoogleAuth extends React.Component {

    state = {isSignedIn:null};

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'567819433489-milcfp9cfb93a2cmc5is6qm701cteqqs.apps.googleusercontent.com',
                scope:'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn:this.auth.isSignedIn.get()});  // 触发component重新渲染
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton(){
        if (this.state.isSignedIn === null){
            return null;
        } else if (this.state.isSignedIn){
            return(
                <button className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }


    render() {
    return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;