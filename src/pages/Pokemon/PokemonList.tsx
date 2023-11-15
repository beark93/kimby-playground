import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { Grid, Box, Modal, CircularProgress } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import PokemonCard from '@components/Card/PokemonCard';
import PokemonSkeleton from '@components/Skeleton/PokemonSkeleton';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

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
        setIsLoading(false);
      })
      .catch(() => {
        setIsEnd(true);
        setIsLoading(false);
      });

  useEffect(() => {
    callPokeApi(offset.current, limit);
  }, []);

  // infinit Scroll 컨트롤
  const handleObserver = useCallback(async (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsLoading(true);
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
                <PokemonCard pokemon={it} />
              </Grid>
            ))
          )}
        </Grid>
        <div style={{ marginBottom: '5px' }} ref={target}></div>
      </ContainerBox>
      <Modal open={isLoading}>
        <Box
          sx={{
            position: 'absolute' as const,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            sx={{
              color: '#fff',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default PokemonList;
