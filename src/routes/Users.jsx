function Users({ users }) {
  return (
    <>
      <h2>Users here</h2>
      <ul>
        {users.map((user) => (
          <li className="user_card" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Users;
