package com.example.carousel.application

class ApplicationContext {
    var user: AuthenticatedUser? = null

    companion object {
        val instance = ApplicationContext()
    }

    fun authenticate(token: String) {
        this.user = AuthenticatedUser(token)
    }

    fun isUserAuthenticated() : Boolean {
        return this.user != null && (this.user?.hasToken() ?: false)
    }

    fun terminateAuthentication() {
        this.user = null
    }
}