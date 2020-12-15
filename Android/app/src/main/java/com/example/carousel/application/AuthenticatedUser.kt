package com.example.carousel.application

class AuthenticatedUser(var token: String) {

    fun hasToken() : Boolean {
        return !this.token.isNullOrEmpty()
    }
}