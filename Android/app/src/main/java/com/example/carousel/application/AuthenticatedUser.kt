package com.example.carousel.application

class AuthenticatedUser(var token: String, var type: String) {

    fun hasToken() : Boolean {
        return !this.token.isNullOrEmpty()
    }
}