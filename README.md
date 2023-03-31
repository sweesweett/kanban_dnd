# Drag&Drop 칸반보드

### ❤ 프로젝트 실행 방법

```
npm install
npm run start
```

### 🧡 시연 영상

- task 추가  
  https://user-images.githubusercontent.com/98820643/229131744-79fefde5-b566-440c-ae88-46948a4f93f8.mp4
- task 상세보기 및 수정

### 💛 기술 스택

Typesript, React, Styled-components, Recoil, React-query, GraphQL

### 💚 구현 내용

```

 ┣ components
    ┗ tasklist
      ┣ AddTask
      ┣ TaskBoard
      ┣ TaskItem
      ┣ TaskList
      ┗ TaskTitleForm -tasklist의 상태를 수정할 수 있도록 따로 컴포넌트로 분리
    ┗ modal
      ┣ Closebar - 수정/등록 모달 종류에 따라 다른 문구 안내, close button
      ┣ DeleteBtn
      ┣ Input - label과 input을 묶어 분리, name, label, type을 기본으로 두고 나머지는 options에 넣어 상황에 따라 설정
      ┣ Modal - 수정/등록 모달 공용으로 사용
      ┣ ModalSelect - 상태 선택 따로 분리
      ┣ ModalWrapper
      ┗ SearchManager -검색을 위해 따로 컴포넌트 분리/ useDebounce를 통해 검색 최적화
    ┣ ErrorIndicator
    ┣ Loading
    ┗ ThemeToggle
 ┣ hooks
     ┣ useDebounce
     ┣ useDynamicImport- 모달 종류에 따른 query 동적 임포트를 위해 구현
     ┣ useForm - 조건 분기를 통해 폼을 제출
     ┣ useSearchParams- 원하는 searchParams를 배열 안에 넣게 될 경우 해당하는 값을 객체로 반환
     ┣ useTheme
     ┗ useThrottle
```

- task CRUD 구현, 목록, 상세 보기 기능 구현

  - 목록 보기  
    `React.Suspense`와 `React-query`, `react-error-boundary 라이브러리`를 사용하여 로딩과 에러처리를 하였습니다.

    ```
    <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => <ErrorIndicator onClickHandler={() => resetErrorBoundary()} />}
        >
          <Suspense fallback={<Loading />}>
            <TaskBoard />
          </Suspense>
        </ErrorBoundary>

    ```

  - task 생성, 수정, 삭제  
    생성&수정은 같은 컴포넌트를 사용했으며, useQuery의 옵션을 통해 useSearchParams훅에서 가져오는 id값의 유무로 생성, 수정을 구분하였습니다.

    ```
    const setSearchValue = useSetRecoilState(SearchAtom);
    const navigate = useNavigate();
    const { data } = useQuery<Pick<FamilyListValue, 'item'>, ClientError>(
    [Querykeys.ITEM, id, state],
    () => graphqlFetcher(GET_ITEM, { id, state }),
    {
      enabled: !!id,
      retry: false,
      onError: (err) => {
        if (err.response.status === 404) {
          navigate('/');
        }
      },
    },
    );

    ```

    매니저를 검색 시, 잦은 api호출을 최적화 하기 위해 `useDebounce` 훅을 사용하였습니다.

    폼을 제출할 시, `useForm`이라는 커스텀 훅을 만들어 생성/수정에 따라서 보내는 데이터나, 쿼리가 달라지도록 처리하였습니다.

    ```
    const useForm = (mode: string) => {
      const navigate = useNavigate();
      const query = useDynamicImport(mode);
      const [isThrottle, setIsThrottle] = useState(false);
      const throttle = useThrottle(isThrottle);
      const queryClient = getClient();
      useEffect(() => {
          if (!throttle) {
            setIsThrottle(false);
          }
      }, [throttle]);
      const fetcher = useMutation((data: FormEditValue | Partial<FormAddValue>) => graphqlFetcher(query, data), {
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: [Querykeys.LISTS] });
          navigate('/');
        },
        onError: (err: string) => {
          console.log(`Error:${err}`);
        },
        });
      const isEditForm = (
          form: { [index: string]: string | null | number | undefined },
          id: string,
        ): form is FormAddValue => {
        return !!id;
      };
      const getFormData = (form: HTMLFormElement, state: string, id: string) => {
      const formData = new FormData(form).entries();
      const formObj = Object.fromEntries(formData) as Partial<FormAddValue>;
        if (!throttle) {
          setIsThrottle(true);
        if (isEditForm(formObj, id)) {
           fetcher.mutate({ data: { ...formObj, id }, state });
        } else {
          fetcher.mutate({ ...formObj });
        }
      }
     };
      return { getFormData };
    };
    export default useForm;
    ```

    `useDynamicImport` 커스텀 훅을 사용하여 mode에 따라 다른 쿼리를 가져오도록 하였고,  
    `useThrottle` 커스텀 훅을 통해, 폼 제출 시 연속으로 클릭 시 발생할 수 있는 문제를 처리하였습니다.

- 드래그 앤 드롭 기능 구현
  - 목록에서 Drag & Drop 이벤트를 활용하여 task 순서, 상태 변경
- 다크모드/라이트 모드 구현  
   `styled-components`의 `ThemeProvider`를 사용했고, `useTheme`이라는 훅을 통해 토글에 따라 테마가 변하도록 처리하였습니다.

  ```
  const useTheme = () => {
    const mode = useRecoilValue(themeSelector);
    const [theme, setTheme] = useState<DefaultTheme>(lightTheme);
    useEffect(() => {
      if (mode === 'light') {
          setTheme(lightTheme);
      } else if (mode === 'dark') {
          setTheme(darkTheme);
      }
    }, [mode]);
    return theme;
  };

  ```
