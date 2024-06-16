import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate, message, setError, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "$lib/components/pumpForm.svelte";
import { withFiles } from 'sveltekit-superforms';

import {
  pumpyActor,
  principalStore,
  loadingStore,
  poolsStore,
  tokensStore,
  balancesStore
} from '$lib/store';
import type {
  MintRequest,
  Pumpy,
  PoolRequest,
  PumpRequest,
  TokenRequest
} from '$lib/declarations/pumpy/pumpy.did';
import type { Principal } from "@dfinity/principal";

let pumpy: Pumpy;


pumpyActor.subscribe((value) => {
  pumpy = value;
  console.log(value)
});

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};


export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    if (!form.valid) return fail(400, { form });
    return message(form, 'Posted OK!');
  },
};