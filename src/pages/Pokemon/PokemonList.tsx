import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { Grid, Box } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/header/BasicHeader';
import MiddleTypography from '@components/typography/MiddleTypography';
import PokemonCard from '@components/card/PokemonCard';
import PokemonSkeleton from '@components/skeleton/PokemonSkeleton';
import LoadingModal from '@components/modal/LoadingModal';
import PokemonInfoModal from '@components/modal/PokemonInfoModal';

import { getPokeList } from '@api/poke';
import { PokeType } from '@utils/poke';

const ContainerBox = React.memo(
  styled(Box)<BoxProps>(() => ({
    height: '80vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      position: 'absolute',
      left: '0px',
      background: '#666666',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(220, 220, 220, 0.4)',
    },
  }))
);

const limit = 40;

const PokemonSkeletonList = () => {
  return new Array(4).fill(0).map((_, idx) => (
    <Grid item container key={`pokemon-skeleton-${idx}`} zero={3}>
      <PokemonSkeleton />
    </Grid>
  ));
};

const PokemonList = () => {
  const [displayList, setDisplayList] = useState<PokeType[]>([]);
  const [isInit, setIsInit] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
  const [infoPokeId, setInfoPokeId] = useState('');

  const offset = useRef(0);
  const root = useRef<HTMLInputElement>(null);
  const target = useRef<HTMLInputElement>(null);

  // pokeApi 호출
  const callPokeApi = (offet: number, limit: number) =>
    getPokeList(offet, limit)
      .then((res) => {
        setDisplayList((state) => [...state, ...res.data.items]);
        if (!res.data.next) {
          setIsEnd(true);
        }
        setIsInit(true);
        setOpenLoading(false);
      })
      .catch(() => {
        setIsEnd(true);
        setOpenLoading(false);
      });

  useEffect(() => {
    callPokeApi(offset.current, limit);
  }, []);

  // infinit Scroll 컨트롤
  const handleObserver = useCallback(async (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOpenLoading(true);
      offset.current += limit;
      callPokeApi(offset.current, limit);
    }
  }, []);

  const options = useMemo(
    () => ({
      root: root.current,
      rootMargin: '5px',
      threshold: 1.0,
    }),
    []
  );

  useEffect(() => {
    if (isInit && !isEnd) {
      const observer = new IntersectionObserver(handleObserver, options);
      if (target.current) observer.observe(target.current);
      return () => observer.disconnect();
    }
  }, [handleObserver, isEnd, isInit, options]);

  const onOpenPokeModal = useCallback((id: string) => {
    setInfoPokeId(id);
    setOpenPokemonInfo(true);
  }, []);

  const onClosePokeModal = useCallback(() => {
    setInfoPokeId('');
    setOpenPokemonInfo(false);
  }, []);

  return (
    <>
      <BasicHeader>
        <MiddleTypography
          fontSize={{
            zero: '1.2rem',
            max: 'h4.fontSize',
          }}
        >
          Pokemon
        </MiddleTypography>
      </BasicHeader>
      <ContainerBox ref={root}>
        <Grid container spacing={4}>
          {!isInit ? (
            <PokemonSkeletonList />
          ) : (
            displayList.map((it) => (
              <Grid item key={`pokemon-${it.name}`} zero={3}>
                <PokemonCard pokemon={it} onClick={onOpenPokeModal} />
              </Grid>
            ))
          )}
        </Grid>
        <div style={{ marginBottom: '5px' }} ref={target}></div>
      </ContainerBox>
      <LoadingModal open={openLoading} />
      <PokemonInfoModal
        open={openPokemonInfo}
        id={infoPokeId}
        onClose={onClosePokeModal}
      />
    </>
  );
};

export default PokemonList;
