interface User {
    id: string;
    name: string;
    age: string;
    email: string;
    password: string;
}

// Select a subset of properties for update
type UpdateProps = Pick<User, 'name' | 'age' | 'email'>;

// Make all properties optional for update
type UpdatePropsOptional = Partial<UpdateProps>;

// Function to update user
function updateUser(updatedProps: UpdatePropsOptional) {
    // hit the database to update the user
}

// Example usage
updateUser({}); // All properties are optional, so an empty object is acceptable
