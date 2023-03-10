## Assignment operators

### `=`

The assignment operator `=` assigns the value on the right to the variable on the left.

```java
int thing = 2; // = 2
```

### `+=`

The addition assignment operator assigns the sum of the variable value on the left and the addend value on the right.

```java
int thing = 2;
thing += 3; // = 5
```

### `-=`

The subtraction assignment operator assigns the difference of the minuend variable value on the left and the subtrahend value on the right.

```java
int thing = 5;
thing -= 2; // = 3
```

### `*=`

The multiplication assignment operator assigns the product of the multiplicand variable value on the left by the multiplier value on the right.

```java
int thing = 5;
thing *= 3; // = 15
```

### `/=`

The division assignment operator assigns the quotient of the dividend variable value on the left by the divisor value on the right.

```java
int thing = 15;
thing /= 3; // = 5
```

### `%=`

The modulo assignment operator assigns the remainder of the dividend variable value on the left by the divison value on the right.

```java
int thing = 15;
thing %= 6; // = 3
```

### `++`

#### post-incrementer

A post-incrementer will increment the value by 1 and if you access the return of this operation the variable with return not incremented yet.

```java
int counter = 1;

int i = counter++; // i = 1, counter = 2
int j = counter; // j = 2
```

#### pre-incrementer

A pre-incrementer will increment the value by 1 and if you acces the return of this operation the variable will return incremented.

```java
int counter = 1;

int i = ++counter; // i = 2, counter = 2
int j = counter; // j = 2
```

### `--`

#### post-decrementer

A post-decrementer will decrement the value by 1 and if you access the return of this operation the variable with return not decremented yet.

```java
int counter = 3;

int i = counter--; // i = 3, counter = 2
int j = counter; // j = 2
```

#### pre-decrementer

A pre-decrementer will decrement the value by 1 and if you acces the return of this operation the variable will return decremented.

```java
int counter = 3;

int i = --counter; // i = 2, counter = 2
int j = counter; // j = 2
```
