import {atom} from "jotai";

export const pageAtom = atom(0);
export const stepAtom = atom(0);
export const fullscreenAtom = atom(false);

export interface MetadataProps {
  step?: number;
}


export const metadatasAtom = atom<MetadataProps[]>([]);


interface SetPageAtomProps {
  forward: boolean
}

export const setPageAtom = atom(
  null,
  (get, set, update: SetPageAtomProps) => {

    const currentPage = get(pageAtom)
    const currentStep = get(stepAtom)
    const currentMetadatas = get(metadatasAtom)

    const metadata = currentMetadatas[currentPage];
    const step = metadata.step ?? 1;

    if (update.forward) {
      if (currentStep < step - 1) {
        set(stepAtom, currentStep + 1)
      } else if (currentPage < currentMetadatas.length - 1) {
        set(pageAtom, currentPage + 1)
        set(stepAtom, 0)
      }
    } else {
      if (currentStep > 0) {
        set(stepAtom, currentStep - 1)
      } else {
        if (currentPage > 0 && currentStep === 0) {
          set(stepAtom, (currentMetadatas[currentPage - 1].step ?? 1) - 1)
        }
        if (currentPage > 0) {
          set(pageAtom, currentPage - 1)
        }
      }
    }

  },
)
