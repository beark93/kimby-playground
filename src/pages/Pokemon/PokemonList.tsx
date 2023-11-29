import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { Grid, Box, TextField, Button } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import PokemonCard from '@components/Card/PokemonCard';
import PokemonSkeleton from '@components/Skeleton/PokemonSkeleton';
import LoadingModal from '@components/Modal/LoadingModal';
import PokemonInfoModal from '@components/Modal/PokemonInfoModal';

import { getPokeList } from '@api/poke';
import { PokeType } from '@utils/poke';
import pokeJson from 'src/assets/json/poke_name.json';

const InputBox = React.memo(
  styled(Box)<BoxProps>(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }))
);

const ContainerBox = React.memo(
  styled(Box)<BoxProps>(() => ({
    height: '75vh',
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

const Header = () => {
  return (
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
  );
};
const MemoizedHeader = React.memo(Header);

const InputArea = ({
  search,
  onChange,
  onKeyDown,
  onClick,
}: {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
}) => {
  return (
    <InputBox mb={2}>
      <TextField
        label='번호 or 이름'
        size='small'
        variant='outlined'
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Button
        variant='outlined'
        color='inherit'
        sx={{ ml: 1 }}
        onClick={onClick}
      >
        검색
      </Button>
    </InputBox>
  );
};
const MemoizedInputArea = React.memo(InputArea);

const PokemonSkeletonList = () => {
  return new Array(4).fill(0).map((_, idx) => (
    <Grid item container key={`pokemon-skeleton-${idx}`} zero={3}>
      <PokemonSkeleton />
    </Grid>
  ));
};
const MemoizedPokemonSkeletonList = React.memo(PokemonSkeletonList);

const PokemonCardList = ({
  pokemon,
  onClick,
}: {
  pokemon: PokeType;
  onClick: (id: string) => void;
}) => {
  return (
    <Grid item key={`pokemon-${pokemon.name}`} zero={3}>
      <PokemonCard pokemon={pokemon} onClick={onClick} />
    </Grid>
  );
};
const MemoizedPokemonCardList = React.memo(PokemonCardList);

const PokemonList = () => {
  const [displayList, setDisplayList] = useState<PokeType[]>([]);
  const [isInit, setIsInit] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [search, setSearch] = useState('');

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

  // 검색
  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const onClickSearch = useCallback(() => {
    if (!search) {
      alert('검색어를 입력해 주세요.');
      return;
    }

    let id = search;
    if (!parseInt(search)) {
      const filteredJson = pokeJson.filter((it) => it.name === search);

      if (filteredJson.length > 0) {
        id = filteredJson[0].pokemon_species_id.toString();
      }
      onOpenPokeModal(id.toString());
    } else {
      onOpenPokeModal(id);
    }
  }, [onOpenPokeModal, search]);

  const onKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 13) {
        onClickSearch();
      }
    },
    [onClickSearch]
  );

  return (
    <>
      <MemoizedHeader />
      <MemoizedInputArea
        search={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDownSearch}
        onClick={onClickSearch}
      />
      <ContainerBox ref={root}>
        <Grid container spacing={4}>
          {!isInit ? (
            <MemoizedPokemonSkeletonList />
          ) : (
            displayList.map((it) => (
              <MemoizedPokemonCardList
                key={`pokemon-${it.name}`}
                pokemon={it}
                onClick={onOpenPokeModal}
              />
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
