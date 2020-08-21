import React, {useState, useEffect} from 'react';
import {Image, Button, View, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const FBStuff = () => {
  const [token, setToken] = useState<string | null>(null);

  const fbPerm = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'user_posts']).then(
      ({isCancelled, grantedPermissions, declinedPermissions}) => {
        if (isCancelled) {
          console.log('cancelled');
        } else {
          console.log({grantedPermissions, declinedPermissions});
        }
      },
    );
  };

  const syncAC = async () => {
    const postsRequest = new GraphRequest(
      '/me/feed?fields=name,message,full_picture,link,application,type',
      {accessToken: token!},
      (error, result) => {
        if (error) {
          console.log({error});
        } else {
          console.log({data: result});
        }
      },
    );
    new GraphRequestManager().addRequest(postsRequest).start();

    // syncWithLocalPhotos()
  };

  useEffect(() => {
    AccessToken.getCurrentAccessToken().then((data) => {
      console.log({token: data?.accessToken.toString()});
      setToken(data?.accessToken.toString() ?? null);
    });
  }, []);

  return (
    <View>
      {token !== null ? (
        <>
          <Button title="Ask extra permissions" onPress={fbPerm} />
          <Button title="Sync animal crossing" onPress={syncAC} />
        </>
      ) : (
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log({error});
            } else if (result.isCancelled) {
              console.log('cancelled');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log({token: data?.accessToken.toString()});
                setToken(data?.accessToken.toString() ?? null);
              });
            }
          }}
        />
      )}
    </View>
  );
};
