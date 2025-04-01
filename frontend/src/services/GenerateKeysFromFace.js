import {ec as EC} from "elliptic";
import {sha256} from "sha.js";
import { Buffer } from "buffer";

export const GenerateKeysFromFace = (faceEmbedding) => {
    if (!faceEmbedding) {
        console.error("Error: faceEmbedding is undefined!");
        return null;
    }

    const hash = new sha256().update(JSON.stringify(faceEmbedding)).digest("hex");

    const ec = new EC("secp256k1");
    const keyPair = ec.keyFromPrivate(hash);

    const privateKey = keyPair.getPrivate("hex");
    const publicKey = keyPair.getPublic("hex");

    console.log("Private Key:", privateKey);
    console.log("Public Key:", publicKey);

    return { privateKey, publicKey };
};
