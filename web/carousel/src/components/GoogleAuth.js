import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { signIn, signOut } from '../redux/auth/actions';
import { connect } from 'react-redux';

export class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1005866627235-accsl31ht1m9lh95nufh4dejqb2vq774.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get());//.getId());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
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
                    onClick={this.onSignOutClick}
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
                    onClick={this.onSignInClick}
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
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return <div> {this.renderSignOut()} </div>
        }
        else {
            return <div> {this.renderSignIn()} </div>
        }

    }
}


const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        googleId: state.auth.googleId
    };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);