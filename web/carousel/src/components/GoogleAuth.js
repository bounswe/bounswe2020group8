import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export class GoogleAuth extends Component {
    state = { isSignedIn: null, profile: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1005866627235-accsl31ht1m9lh95nufh4dejqb2vq774.apps.googleusercontent.com',
                scope: 'profile'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.setState({ profile: this.auth.currentUser.get().getAuthResponse() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.setState({ profile: this.auth.currentUser.get().getBasicProfile() })

    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderSignOut() {
        return (
            <div
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <button
                    onClick={this.onSignOut}
                    style={{
                        height: 40,
                        width: 200,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                    <b> Sign out</b>
                </button>
            </div>
        )
    }

    renderSignIn() {
        return (
            <div
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <button
                    onClick={this.onSignIn}
                    style={{
                        height: 40,
                        width: 200,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    }}>
                    <FontAwesomeIcon
                        icon={faGoogle}
                        style={{
                            height: 20,
                            width: 20,
                            marginRight: 10,
                            color: '#ea4335'
                        }}
                    />
                    <b> Sign in with Google</b>
                </button>
            </div>
        )
    }

    render() {
        if (this.state.isSignedIn === null) {
            return null;
        }
        else if (this.state.isSignedIn) {
            return <div> {this.renderSignOut()} </div>
        }
        else {
            return <div> {this.renderSignIn()} </div>
        }

    }
}

export default GoogleAuth
