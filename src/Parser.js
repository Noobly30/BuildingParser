const { Tokenizer } = require("./Tokenizer");

class Parser {
    //Initializes the parser.
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    //Parses a string into an AST.
    parser(string) {

    }

    /**
   * Main entry point.
   *
   * Program
   *   : StatementList
   */
    Program() {

    }

    /**
   * StatementList
   *   : Statement
   *   | StatementList Statement -> Statement Statement Statement Statement
   */
    StatementList(stopLookahead = null) {

    }

    /**
   * Statement
   *   : ExpressionStatement
   *   | BlockStatement
   *   | EmptyStatement
   *   | VariableStatement
   *   | IfStatement
   *   | IterationStatement
   *   | BreakStatement
   *   | ContinueStatement
   *   | FunctionDeclaration
   *   | ReturnStatement
   *   | ClassDeclaration
   */

    Statement() {

    }

    ClassDeclaration() {

    }

    /**
   * ClassExtends
   *   : 'extends' Identifier
   */
    ClassExtends() {

    }

    /**
   * FunctionDeclaration
   *   : 'def' Identifier '(' OptFormalParameterList ')' BlockStatement
   */

    FunctionDeclaration() {

    }

    /**
   * FormalParameterList
   *   : Identifier
   *   | FormalParameterList ',' Identifier
   */
    FormalParameterList() {
        const params = [];

        do {
            params.push(this.Identifier());
        } while (this._lookhead.type === ',' && this._eat(','));

        return params;
    }

    /**
   * ReturnStatement
   *   : 'return' OptExpression ';'
   */
    ReturnStatement() {

    }

    /**
   * IterationStatement
   *   : WhileStatement
   *   | DoWhileStatement
   *   | ForStatement
   */
    IterationStatement() {
        switch (this._lookahead.type) {
            case 'while':
                return this.WhileStatement();
            case 'do':
                return this.DoWhileStatement();
            case 'for':
                return this.ForStatement();
        }
    }

    /**
   * WhileStatement
   *  : 'while' '(' Expression ')' Statement
   */
    WhileStatement() {

    }

    /**
     * DoWhileStatement
     *      : 'do' Statement 'while' '(' Expression ')' ';'
     */
    DoWhileStatement() {

    }

    /**
     * ForStatement
     *      : 'for' '(' OptForStatementInit ';' OptExpression ';' OptExpression ')' Statement
     */
    ForStatement() {

    }

    /**
   * ForStatementInit
   *   : VariableStatementInit
   *   | Expression
   */
    ForStatementInit() {

    }

    /**
   * BreakStatement
   *   : 'break' ';'
   */
    BreakStatement() {
        this._eat('break');
        this._eat(';');
        return {
            type: 'BreakStatement',
        };
    }

    /**
   * ContinueStatement
   *   : 'continue' ';'
   */
    ContinueStatement() {
        this._eat('continue');
        this._eat(';');
        return {
            type: 'ContinueStatement',
        };
    }

    /**
   * IfStatement
   *   : 'if' '(' Expression ')' Statement
   *   | 'if' '(' Expression ')' Statement 'else' Statement
   */
    IfStatement() {

    }

    /**
   * VariableStatementInit
   *   : 'let' VariableDeclarationList
   */
    VariableStatementInit() {

    }

    /**
   * VariableStatement
   *   : VariableStatementInit ';'
   */
    VariableStatement() {
        const variableStatement = this.VariableStatementInit();
        this._eat(';');
        return variableStatement;
    }

    /**
   * VariableDeclarationList
   *   : VariableDeclaration
   *   | VariableDeclarationList ',' VariableDeclaration
   */
    VariableDelarationList() {

    }

    /**
   * VariableDeclaration
   *   : Identifier OptVariableInitializer
   */
    VariableDeclaration() {

    }

    /**
   * VariableInitializer
   *   : SIMPLE_ASSIGN AssignmentExpression
   */
    VariableInitializer() {
        this._eat('SIMPLE_ASSIGN');
        return this.AssignmentExpression();
    }

    /**
   * EmptyStatement
   *   : ';'
   */
    EmptyStatement() {
        this._eat(';');
        return {
            type: 'EmptyStatement',
        };
    }

    /**
     * BlockStatement
     *      : '{' OptStatement '}'
     */
    BlockStatement() {

    }

    /**
     * ExpressionStatement
     *      : Expression ';'
     */
    ExpressionStatement() {

    }

    /**
     * Expression
     *      :AssignmentExpression
     */
    Expression() {
        return this.AssignmentExpression();
    }

    /**
   * AssignmentExpression
   *   : LogicalORExpression
   *   | LeftHandSideExpression AssignmentOperator AssignmentExpression
   */
    AssignmentExpression() {

    }

    /**
   * Identifier
   *   : IDENTIFIER
   */
    Identifier() {
        const name = this._eat('IDENTIFIER').value;
        return {
            type: 'Identifier',
            name,
        };
    }

    //Extra check whether it's valid assignment target.
    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier' || node.type === 'MemberExpression') {
            return node;
        }
        throw new SyntaxError('Invalid left-hand side in assignment expression');
    }

    //Whether the token is an assignment operator
    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
    }

    /**
   * AssignmentOperator
   *   : SIMPLE_ASSIGN
   *   | COMPLEX_ASSIGN
   */
    AssignmentOperator() {
        if (this._lookahead.type === 'SIMPLE_ASSIGN') {
            return this._eat('SIMPLE_ASSIGN');
        }
        return this._eat('COMPLEX_ASSIGN');
    }

    /**
    * Logical OR expression.
    *
    *   x || y
    *
    * LogicalORExpression
    *     : LogicalORExpression
    *   | LogicalORExpression LOGICAL_OR LogicalANDExpression
    */
    LogicalORExpression() {

    }

    /**
     * Logical AND expression.
     *
     *   x && y
     *
     * LogicalANDExpression
     *   : EqualityExpression
     *   | LogicalANDExpression LOGICAL_AND EqualityExpression

     */
    LogicalANDExpression() {

    }

    /**
     * EQUALITY_OPERATOR: ==, !=
     *
     *   x == y
     *   x != y
     *
     * EqualityExpression
     *   : RelationalExpression
     *   | EqualityExpression EQUALITY_OPERATOR RelationalExpression
     */
    EqualityExpression() {

    }

    /**
     * RELATIONAL_OPERATOR: >, >=, <, <=
     *
     *   x > y
     *   x >= y
     *   x < y
     *   x <= y
     *
     * RelationalExpression
     *   : AdditiveExpression
     *   | RelationalExpression RELATIONAL_OPERATOR AdditiveExpression
     */
    RelationalExpression() {

    }

    /**
     * AdditiveExpression
     *   : MultiplicativeExpression
     *   | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression
     */
    AdditiveExpression() {

    }

    /**
     * MultiplicativeExpression
     *   : UnaryExpression
     *   | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression
     */
    MultiplicativeExpression() {

    }

    //Generic helper for LogicalExpression nodes.
    _LogicalExpression(builderName, operatorToken) {

    }

    //Generic binary expression.
    _BinaryExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();

            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right,
            };
        }
        return left;
    }

    /**
   * UnaryExpression
   *   : LeftHandSideExpression
   *   | ADDITIVE_OPERATOR UnaryExpression
   *   | LOGICAL_NOT UnaryExpression
   */
    UnaryExpression() {

    }

    /**
     * LeftHandSideExpression
     *      : CallMemberExpression
     */
    LeftHandSideExpression() {
        return this.CallMemberExpression(); 
    }

    /**
   * CallMemberExpression
   *   : MemberExpression
   *   | CallExpression
   */
    CallMemberExpression() {
  
    }

    /**
   * Generic call expression helper.
   *
   * CallExpression
   *   : Callee Arguments
   *
   * Callee
   *   : MemberExpression
   *   | Super
   *   | CallExpression
   */
    _CallExpression(callee) {

    }

    /**
   * Arguments
   *   : '(' OptArgumentList ')'
   */
    Arguments() {
        
    }

    /**
   * ArgumentList
   *   : AssignmentExpression
   *   | ArgumentList ',' AssignmentExpression
   */
    ArgumentList() {
     
    }

    /**
   * MemberExpression
   *   : PrimaryExpression
   *   | MemberExpression '.' Identifier
   *   | MemberExpression '[' Expression ']'
   */
    MemberExpression() {

    }

    /**
   * PrimaryExpression
   *   : Literal
   *   | ParenthesizedExpression
   *   | Identifier
   *   | ThisExpression
   *   | NewExpression
   */
    PrimaryExpression() {
        
    }

    /**
   * NewExpression
   *   : 'new' MemberExpression Arguments
   */
    NewExpression() {

    }

    /**
   * ThisExpression
   *   : 'this'
   *   ;
   */
    ThisExpression() {
        this._eat('this');
        return {
            type: 'ThisExpression',
        };
    }

    /**
  * Super
  *   : 'super'
  */
    Super() {

    }

   
    //Whether the token is a literal.
   
    _isLiteral(tokenType) {

    }

    /**
   * ParenthesizedExpression
   *   : '(' Expression ')'
   */
    ParenthesizedExpression() {
      
    }

    /**
   * Literal
   *   : NumericLiteral
   *   | StringLiteral
   *   | BooleanLiteral
   *   | NullLiteral
   */
    Literal() {
        
    }

    /**
   * BooleanLiteral
   *   : 'true'
   *   | 'false'
   */
    BooleanLiteral(value) {
        this._eat(value ? 'true' : 'false');
        return {
            type: 'BooleanLiteral',
            value,
        };
    }

    /**
   * NullLiteral
   *   : 'null'
   */
    NullLiteral() {

    }

    /**
   * StringLiteral
   *   : STRING
   */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1),
        };
    }

    /**
   * NumericLiteral
   *   : NUMBER
   */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    //Expects a token of a given type.
    _eat(tokenType) {
        
    }
}

module.exports = {
    Parser,
};
