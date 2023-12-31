import { useState, useEffect } from 'react';

import { getPokeInfo } from '@api/poke';
import { PokeInfoType } from '@utils/poke';

const usePokemon = (id: string, errorHandler: () => void) => {
  const [pokeInfo, setPokeInfo] = useState<PokeInfoType | null>(null);

  useEffect(() => {
    if (id === '') {
      setPokeInfo(null);
      return;
    }
    getPokeInfo(id)
      .then((res) => {
        setPokeInfo(res.data);
      })
      .catch(() => {
        alert('조회에 실패하였습니다.');
        errorHandler();
      });
  }, [id, errorHandler]);

  return pokeInfo;
};

export default usePokemon;
