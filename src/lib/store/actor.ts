import { idlFactory } from "$lib/declarations/pumpy/pumpy.did";
import type { _SERVICE as Pumpy_SERVICE } from "$lib/declarations/pumpy/pumpy.did.ts";
import {
  Actor,
  HttpAgent,
  type ActorSubclass,
  type Identity,
} from "@dfinity/agent";

const getAgent = async (identity: Identity): Promise<HttpAgent> => {
  const host = import.meta.env.DEV
    ? "http://localhost:8080/"
    : "https://icp0.io/";
  const agent: HttpAgent = new HttpAgent({ identity, host });

  if (import.meta.env.DEV) {
    await agent.fetchRootKey();
  }

  return agent;
};

export const getPumpyActor = async (
  identity: Identity
): Promise<ActorSubclass<Pumpy_SERVICE>> => {
  const canisterId: string = import.meta.env.VITE_Pumpy_CANISTER_ID as string;

  const agent = await getAgent(identity);

  return Actor.createActor(idlFactory, { agent, canisterId });
};