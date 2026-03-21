// ITERATOR
// Recorrer elementos de una colección 
// sin exponer su representación subyacente.

interface ProfileIterator {
    geNext(): void
    hasMore(): void
}

interface SocialNetwork {
    createFriendsIterator(profileId: any): ProfileIterator;
    createCoworkersIterator(profileId: any): ProfileIterator;
}

class FacebookIterator implements ProfileIterator {
    geNext() { }

    hasMore() { }
}

class Facebook implements SocialNetwork {

    createFriendsIterator(profileId: any): ProfileIterator {
        throw new Error("Method not implemented.");
    }
    createCoworkersIterator(profileId: any): ProfileIterator {
        throw new Error("Method not implemented.");
    }

}

class SocialSpammer {
    constructor(private iterator: ProfileIterator) { }

    sendSpam(iterator: ProfileIterator) {

    }
}

class Application {
    constructor(private network: SocialNetwork) { }

    send(iterator: SocialNetwork) { }
}

