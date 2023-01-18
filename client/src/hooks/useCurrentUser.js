import { useState } from 'react';

export default function useCurrentUser() {
  const getCurrentUser = () => {
    const currentUserString = sessionStorage.getItem('currentUser');
    const currentUserData = JSON.parse(currentUserString);
    return currentUserData;
  };
  const [currentUser, setCurrentUser] = useState(getCurrentUser() || "");

  const saveCurrentUser = user => {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  return {
    setCurrentUser: saveCurrentUser,
    currentUser
  };
}
