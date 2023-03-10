const Spec = [
    // Implement here...
];

/**
 * Tokenizer class.
 *
 * Lazily pulls a token from a stream.
 */
class Tokenizer {
    /**
     * Initializes the string.
     */
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    /**
     * Whther the tokenizer reached EOF.
     */
    isEOF() {
        return this._cursor === this._string.length;
    }

    /**
     * Whether we still have more tokens.
     */
    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    /**
     * Obtains next token.
     */
    getNextToken() {
        // Implement here...
    }
}

module.exports = {
    Tokenizer,
};