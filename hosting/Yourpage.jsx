import React, { useEffect, useState } from 'react';
import { auth, db } from './Config';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

function Yourpage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [showProfileForm, setShowProfileForm] = useState(true);
    const [value, setValue] = useState('');
    const [profileName, setProfileName] = useState('');


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);

            // Fetch user data from Firestore when the user is authenticated
            if (user) {
                try {
                    const firestore = getFirestore();
                    const userRef = doc(collection(firestore, 'users'), user.uid);
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                        setProfileName(docSnap.data().name);
                    } else {
                        console.log('User document does not exist.');// Optionally handle the case when the document doesn't exist
                        await setDoc(userRef, { email: user.email, name: '' });
                        setUserData({ email: user.email, name: '' });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        });
        return () => {
            console.log('Cleaning up auth subscription');
            unsubscribe();
        };
    }, []);


    async function handleSubmit() {
        setProfileName(value);
        setShowProfileForm(false);

        try {
            const firestore = getFirestore();
            const userRef = doc(collection(firestore, 'users'), currentUser.uid);
            //console.log('User UID:', currentUser.uid);
            //console.log('User Reference:', userRef.path);
            //console.log('Profile name:', value)
            // Update the document with the new profileName
            await updateDoc(userRef, { name: value });
        } catch (error) {
            console.error('Error updating user document:', error);
        }
        setValue('');
    }
    // console.log(userData)

    return (
        <div>
            <h1>This is your page</h1>
            {!showProfileForm && (<p>Welcome {profileName}</p>)}
            {userData && userData.name && (
                <div>
                    <p>Name: {userData.name}</p>
                </div>
            )}
            {userData && !userData.name && showProfileForm && (
                <div>
                    <p>Email: {userData.email}</p>
                    <p>Create your username here</p>
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={handleSubmit} >Submit</button>
                </div>
            )}
            {profileName &&
                <div>Ok {profileName}   now that we are established you are in, let us progress</div>
            }
        </div>
    );
}

export default Yourpage;



