import { FediverseClient } from "./FediverseClient";
import { LemmyClient } from "./LemmyClient";
import { PiefedClient } from "./PiefedClient";
// import { KbinClient } from './KbinClient';

export type FediversePlatform = "piefed" | "lemmy" | "kbin";

const PIEFED_INSTANCES = ["piefed.social", "piefed.blahaj.zone", "piefed"];

const LEMMY_INSTANCES = ["lemmy.world", "feddit.cl", "lemmy", "programming.dev"];

export function createClientForInstance(
  instance: string,
  token?: string
): {
  client: FediverseClient;
  platform: FediversePlatform;
} {
  const normalized = instance.replace(/^https?:\/\//, "").toLowerCase();

  if (PIEFED_INSTANCES.includes(normalized)) {
    return { client: new PiefedClient(`https://${normalized}`, token), platform: "piefed" };
  }

  if (LEMMY_INSTANCES.includes(normalized))
    return {
      client: new LemmyClient(`https://${normalized}`, token),
      platform: "lemmy",
    };
  // TODO: ping some API to detect what type of instance it is
  // if (KBIN_INSTANCES.includes(normalized)) return new KbinClient(...);

  throw new Error(`No client implementation for instance: ${instance}`);
}

// async function autodetectInstance(url: string): Promise<string> {
//   const client = ;
//   const instance = await client.getSiteInfo();
//   return instance.instance;
// }
