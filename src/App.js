import React, { useState, Fragment } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';

const App = () => {
	// Data
	const usersData = [
		{ id: 1, name: 'Amine', username: 'amyou' },
		{ id: 2, name: 'Test1', username: 'CowboyBebop' },
		{ id: 3, name: 'Test2', username: 'Guts' },
	];

	const initialFormState = { id: null, name: '', username: '' };

	// Setting state
	const [ users, setUsers ] = useState(usersData);
	const [ currentUser, setCurrentUser ] = useState(initialFormState);
	const [ editing, setEditing ] = useState(false);

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1;
		setUsers([ ...users, user ])
	};

	const deleteUser = id => {
		setEditing(false);

		setUsers(users.filter(user => user.id !== id))
	};

	const updateUser = (id, updatedUser) => {
		setEditing(false);

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	};

	const editRow = user => {
		setEditing(true);

		setCurrentUser({ id: user.id, name: user.name, username: user.username })
	};

	return (
		<div className="container">
			<img src="avataaars.png" alt="logo" height="280" width="264" className="logo"/>
			<h1>React Hooks CRUD</h1>
			<div>
				<div className="userEdit">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="userEdit">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
};

export default App;
