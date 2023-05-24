```ts
  @public
  collection User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    publicKey: PublicKey;
    createdCommunitiesId: string[];
    joinedCommunitiesId: string[];
    artistCommunitiesId: string[];
    createdAt: number;
    updatedAt: number;

    constructor (id: string, name: string, email: string, avatarUrl: string, createdAt: number) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.avatarUrl = avatarUrl;
      this.publicKey = ctx.publicKey;
      this.createdCommunitiesId = [];
      this.joinedCommunitiesId = [];
      this.artistCommunitiesId = [];
      this.updatedAt = createdAt;
      this.createdAt = createdAt;
    }

    updateProfile (name: string, email: string, avatarUrl: string, updatedAt: number) {
      if (ctx.publicKey != this.publicKey) {
        error('You are not the creator of this record.');
      }
      this.name = name;
      this.email = email;
      this.avatarUrl = avatarUrl;
      this.updatedAt = updatedAt;
    }

    setCommunityId (id: string, type: string, updatedAt: number) {
      if (ctx.publicKey != this.publicKey) {
        error('You are not the creator of this record.');
      }
      if(type == 'created') {
        this.createdCommunitiesId.push(id);
      }
      if (type == 'joined') {
        this.joinedCommunitiesId.push(id);
      }
      if (type == 'artist') {
        this.artistCommunitiesId.push(id);
      }
      this.updatedAt = updatedAt;
    }
  }

  @public
  collection Community {
    id: string;
    name: string;
    daoAccountAddress: string;
    description: string;
    coverImage: string;
    storageProvider: string;
    publicKey: PublicKey;
    songsId: string[];
    updatedAt: number;
    createdAt: number;

    constructor (id: string, name: string, daoAccountAddress: string, description: string, coverImage: string, storageProvider: string, createdAt: number) {
      this.id = id;
      this.name = name;
      this.daoAccountAddress = daoAccountAddress;
      this.description = description;
      this.coverImage = coverImage;
      this.storageProvider = storageProvider;
      this.publicKey = ctx.publicKey;
      this.songsId = [];
      this.updatedAt = createdAt;
      this.createdAt = createdAt;
    }

    updateCommunity (name: string, daoAccountAddress: string, description: string, coverImage: string, storageProvider: string, updatedAt: number) {
      if (ctx.publicKey != this.publicKey) {
        error('You are not the creator of this record.');
      }
      this.name = name;
      this.daoAccountAddress = daoAccountAddress;
      this.description = description;
      this.coverImage = coverImage;
      this.storageProvider = storageProvider;
      this.updatedAt = updatedAt;
    }

    setSongId (id: string, updatedAt: number) {
      this.songsId.push(id);
      this.updatedAt = updatedAt;
    }
  }

  @public
  collection Song {
    id: string;
    name: string;
    artist: string;
    artistAccountAddress: string;
    fromDAO: string;
    description: string;
    coverImage: string;
    songUrl: string;
    publicKey: PublicKey;
    updatedAt: number;
    createdAt: number;

    constructor (id: string, name: string, artist: string, artistAccountAddress: string, fromDAO: string, description: string, coverImage: string, songUrl: string, createdAt: number) {
      this.id = id;
      this.name = name;
      this.artist = artist;
      this.artistAccountAddress = artistAccountAddress;
      this.fromDAO = fromDAO;
      this.description = description;
      this.coverImage = coverImage;
      this.songUrl = songUrl;
      this.publicKey = ctx.publicKey;
      this.updatedAt = createdAt;
      this.createdAt = createdAt;
    }
  }

  @public
  collection Communities {
    id: string;
    name: string;
    description: string;
    communitiesId: string[];
    songsId: string[];
    updatedAt: number;
    createdAt: number;

    constructor (id: string, name: string, description: string, createdAt: number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.communitiesId = [];
      this.songsId = [];
      this.updatedAt = createdAt;
      this.createdAt = createdAt;
    }

    setCommunityId (id: string, updatedAt: number) {
      this.communitiesId.push(id);
      this.updatedAt = updatedAt;
    }

    setSongId (id: string, updatedAt: number) {
      this.songsId.push(id);
      this.updatedAt = updatedAt;
    }
  }
```
