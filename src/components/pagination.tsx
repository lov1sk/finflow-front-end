import { Stack, Pagination } from "@mui/material";

type Props = {
  count: number;
  page: number;
  handleChange: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationComponent(props: Props) {
  const changePage = (event: unknown, value: number) => {
    props.handleChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        size={"large"}
        count={props.count}
        shape="rounded"
        color="primary"
        page={props.page}
        onChange={changePage}
      />
    </Stack>
  );
}
