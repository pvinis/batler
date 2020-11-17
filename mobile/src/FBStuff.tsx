import React, {useState, useEffect} from 'react';
import {Image, Button, View, Text, FlatList} from 'react-native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const FBStuff = () => {
  const [token, setToken] = useState<string | null>(null);
  const [photos, setPhotos] = useState([]);

  const fbPerm = async () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'user_posts',
      'user_photos',
      'user_videos',
    ]).then(({isCancelled, grantedPermissions, declinedPermissions}) => {
      if (isCancelled) {
        console.log('cancelled');
      } else {
        console.log({grantedPermissions, declinedPermissions});
      }
    });
  };

  const syncWithLocalPhotos = (posts) => {
    posts.map((post) => {
      console.log(`post: ${post.id}`);
      console.log(`type: ${post.type}`);
      console.log('--');
    });
    console.log(posts.length);
    const a = posts
      //   .filter((post) => post.type === 'photo')
      .map((post) => ({
        url: post.full_picture,
        type: post.type,
      }));
    console.log(a.length);
    setPhotos(a);
  };

  const photoRequest = (object_id) => `/${object_id}?fields=id,images`;
  const videoRequest = (object_id) => `/${object_id}?fields=id,source`;

  const syncAC = async () => {
    const postsRequest = new GraphRequest(
      '/me/feed?fields=id,name,message,full_picture,link,application,type,object_id',
      {accessToken: token!},
      (error, result) => {
        if (error) {
          console.log({error});
        } else {
          console.log({data: result});
          syncWithLocalPhotos(result.data);
        }
      },
    );
    new GraphRequestManager().addRequest(postsRequest).start();
  };

  useEffect(() => {
    AccessToken.getCurrentAccessToken().then((data) => {
      console.log({token: data?.accessToken.toString()});
      setToken(data?.accessToken.toString() ?? null);
    });
  }, []);

  console.log('aaa' + photos.length);
  return (
    <View style={{flex: 1}}>
      {token !== null ? (
        <>
          <Button title="Ask extra permissions" onPress={fbPerm} />
          <Button title="Sync animal crossing" onPress={syncAC} />
          <FlatList
            data={photos}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text>{item.type}</Text>
                  <Image
                    source={{uri: item.url}}
                    style={{height: 120, width: 120}}
                  />
                </View>
              );
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{height: 1, width: '100%', backgroundColor: 'blue'}}
              />
            )}
          />
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
