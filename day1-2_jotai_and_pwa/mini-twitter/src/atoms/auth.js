import { atom } from 'jotai';
import auth from "../utils/auth";

const { checkAuth } = auth()

export const isLoggedAtom = atom(checkAuth());