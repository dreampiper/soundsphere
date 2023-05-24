import { store } from "@/store/store";
import generateQuickGuid from "@/utils/generateQuickGuid";
import { Auth } from "@polybase/auth";
import { Polybase } from "@polybase/client";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface Community {
  id: string;
  name: string;
  daoAccountAddress: string;
  description: string;
  coverImage: string;
  storageProvider: string;
  songsId: string[];
  updatedAt: number;
  createdAt: number;
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  artistAccountAddress: string;
  songTitle: string;
  fromDAO: string;
  description: string;
  coverImage: string;
  songUrl: string;
  updatedAt: number;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdCommunitiesId: string[];
  joinedCommunitiesId: string[];
  artistCommunitiesId: string[];
  createdAt: number;
  updatedAt: number;
}

const db = new Polybase({
  defaultNamespace:
    "pk/0xc6ee1cb9da60e50c3bafb64fb333412030f9c792c8497c0f7d43e68ac717fc46ce38818b60053391c8e0e711c5024818bd3ad330ef2443608bc37fc2388ed3b1/SoundSphere",
});

const userReference = db.collection("User");
const communityReference = db.collection("Community");
const songReference = db.collection("Song");
const communitiesObjReference = db.collection("Communities");

export const usePolybase = () => {
  const [loggedIn, setLogin] = useState(false);
  const userId = store((state) => state.userId);
  const setUserId = store((state) => state.setUserId);

  const [auth, setAuth] = useState<any>();

  const [communitiesObjId, setCommunitiesObjId] = useState("ss_test_0");
  const [getCommunitiesId, setCommunities] = useState<string[] | null>(null);
  const [getSongsId, setSongsId] = useState<string[] | null>(null);
  const [communityId, setActiveCommunityId] = useState<string | null>(null);
  const [songId, setActiveSongId] = useState<string | null>(null);

  const [getCommunity, setCommunityData] = useState<Community | null>(null);
  const [getSong, setSongData] = useState<Song | null>(null);
  useEffect(() => {
    setAuth(new Auth());
  }, []);

  useMemo(() => {
    auth?.onAuthUpdate((authState: { userId: any }) => {
      if (authState) {
        setLogin(true);
        setUserId(authState.userId);
      } else {
        setLogin(false);
        setUserId(null);
      }
    });
  }, [auth]);

  db.signer(async (data) => {
    console.log(data);
    return {
      h: "eth-personal-sign",
      sig: await auth.ethPersonalSign(data),
    };
  });

  const authenticate = async () => {
    if (!auth) return;
    console.log(auth);
    const res = await auth.signIn({ force: true });

    if (!res?.userId) {
      auth.signOut();
    } else {
      await userReference.create([
        res?.userId, // id
        "", // name
        res?.email || "", // email
        "", // avatarUrl
        Date.now(), // createdAt
      ]);
      setUserId(res?.userId);
    }
  };

  /* USER */

  const getUserRecord = useCallback(async (userId: string) => {
    return (await userReference.record(userId).get()).data as User;
  }, []);

  const addDAOToArtistCommunities = useCallback(
    async ({ userId, daoId }: { userId: string; daoId: string }) => {
      userReference
        .record(userId)
        .call("setCommunityId", [daoId, "artist", Date.now()]);
    },
    []
  );

  /* COMMUNITY */

  const createCommunity = useCallback(
    async ({
      name,
      daoAccountAddress,
      description,
      coverImage,
      storageProvider,
    }: {
      name: string;
      daoAccountAddress: string;
      description: string;
      coverImage: string;
      storageProvider: string;
    }) => {
      if (!userId) return;
      const randomId = generateQuickGuid() + "-" + Date.now();
      await communityReference
        .create([
          randomId, // id
          name, // name
          daoAccountAddress, // daoAccountAddress
          description, // description
          coverImage, // coverImage
          storageProvider, // storageProvider
          Date.now(), // createdAt
        ])
        .then(() => {
          userReference
            .record(userId)
            .call("setCommunityId", [randomId, "created", Date.now()]);
          communitiesObjReference
            .record(communitiesObjId)
            .call("setCommunityId", [randomId, Date.now()]);
        });
    },
    []
  );

  // getCommunity
  useMemo(async () => {
    if (!communityId) return;
    communityReference.record(communityId).onSnapshot(
      (newDoc) => {
        setCommunityData(newDoc.data as Community);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [communityId]);

  const getCommunities = useCallback(async (communitiesId: string[]) => {
    const data = communitiesId.map(
      async (id) =>
        (await communityReference.record(id).get()).data as Community
    );
    return await Promise.all(data);
  }, []);

  // updateCommunity
  // deleteCommunity

  /* SONG */

  const addSong = useCallback(
    async ({
      name,
      artist,
      artistAccountAddress,
      fromDAO,
      description,
      coverImage,
      songUrl,

      communityId,
    }: {
      name: string;
      artist: string;
      artistAccountAddress: string;
      fromDAO: string;
      description: string;
      coverImage: string;
      songUrl: string;

      communityId: string;
    }) => {
      const randomId = generateQuickGuid() + "-" + Date.now();
      songReference
        .create([
          randomId, // id
          name, // name
          artist, // artist
          artistAccountAddress, // artistAccountAddress
          fromDAO, // fromDAO
          description, // description
          coverImage, // coverImage
          songUrl, // songUrl
          Date.now(), // createdAt
        ])
        .then(() => {
          communityReference
            .record(communityId)
            .call("setSongId", [randomId, Date.now()]);
          communitiesObjReference
            .record(communitiesObjId)
            .call("setSongId", [randomId, Date.now()]);
        });
    },
    []
  );

  // getSong
  useMemo(async () => {
    if (!songId) return;
    songReference.record(songId).onSnapshot(
      (newDoc) => {
        setSongData(newDoc.data as Song);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [songId]);

  const getSongs = useCallback(async (songsId: string[]) => {
    const data = songsId.map(
      async (id) => (await songReference.record(id).get()).data as Song
    );
    return await Promise.all(data);
  }, []);

  // updateSong
  // deleteSong

  /* COMMUNITIES */

  const createCommunitiesObject = useCallback(
    async ({
      id,
      name,
      description,
    }: {
      id: string;
      name: string;
      description: string;
    }) => {
      const c = await communitiesObjReference.create([
        id, // id
        name, // name
        description, // description
        Date.now(), // createdAt
      ]);

      console.log("why");

      console.log(c);
    },
    []
  );

  // createCommunitiesObject({
  //   id: communitiesObjId,
  //   name: "SoundSphere",
  //   description: "SoundSphere is a DAO for music lovers.",
  // });

  // getCommunitiesId
  useMemo(async () => {
    communitiesObjReference.record(communitiesObjId).onSnapshot(
      (newDoc) => {
        const { communitiesId } = newDoc.data as any;
        setCommunities(communitiesId);
        console.log(newDoc);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // getSongsId
  useMemo(async () => {
    communitiesObjReference.record(communitiesObjId).onSnapshot(
      (newDoc) => {
        const { songsId } = newDoc.data as any;
        setSongsId(songsId);
        console.log(newDoc);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // updateCommunities
  // deleteCommunities

  return {
    auth: authenticate,
    loggedIn,

    getUserRecord,
    addDAOToArtistCommunities,

    createCommunity,
    getCommunity,
    getCommunities,
    // updateCommunity,
    // deleteCommunity,
    setActiveCommunityId,
    setActiveSongId,

    addSong,
    getSong,
    getSongs,
    getSongsId,
    // updateSong,
    // deleteSong,

    createCommunitiesObject,
    getCommunitiesId,
    // updateCommunities
    // deleteCommunities
  };
};
