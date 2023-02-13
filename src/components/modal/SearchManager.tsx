import styled from 'styled-components';
import Input from './Input';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_MANAGER } from '../../graphql/lists';
import { Managers } from '../../types/lists';
import { ChangeEvent, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useRecoilState } from 'recoil';
import { SearchAtom } from '../../store';

const SearchManager = () => {
  const [searchValue, setSearchValue] = useRecoilState(SearchAtom);
  const debounce = useDebounce(searchValue);
  const { data, refetch, remove } = useQuery<Managers>(
    Querykeys.MANAGER,
    () => graphqlFetcher(GET_MANAGER, { searchString: debounce }),
    {
      enabled: !!debounce,
    },
  );
  useEffect(() => {
    if (debounce) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    }
  }, [debounce, refetch]);
  useEffect(() => {
    return () => remove();
  }, [remove]);
  return (
    <SearchManagerWrapper>
      <Input
        type="text"
        name="manager"
        label="담당자"
        options={{
          placeholder: '담당자 찾기',
          value: searchValue,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          },
        }}
      />

      <DropUl>
        {data?.managers.map((manager) => (
          <DropLi
            key={manager.id}
            onClick={() => {
              setSearchValue(manager.name);
            }}
          >
            {manager.name}
          </DropLi>
        ))}
      </DropUl>
    </SearchManagerWrapper>
  );
};

const SearchManagerWrapper = styled.div``;
const DropUl = styled.ul`
  margin-top: 12px;
  height: 40px;
  width: 100%;
  overflow-x: auto;
`;
const DropLi = styled.li`
  display: inline-block;
  margin-right: 8px;
  padding: 4px;
  border-radius: 15px;
  font-size: 14px;
  background-color: white;
  font-weight: 500;
  border: 3px solid #fed6e3;
  cursor: pointer;
  :hover,
  :active {
    border: 3px solid #ffb2cb;
  }
`;
export default SearchManager;
