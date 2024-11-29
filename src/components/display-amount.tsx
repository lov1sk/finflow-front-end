"use Client";
import { Box, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { FC } from "react";

type DisplayAmountTypes = {
  label: string;
  value?: number;
  text?: string;
  money?: boolean;
  percent?: boolean;
  dateType?: boolean;
  date?: Date | string | null;
  sufix?: string;
  prefix?: string;
  tip?: string;
  labelFontSize?: number;
  valueFontSize?: number;
  labelFontWeight?: number;
  valueFontWeight?: number;
};

const DisplayAmount: FC<DisplayAmountTypes> = ({
  label,
  value,
  text,
  money,
  percent,
  date,
  dateType,
  sufix,
  prefix,
  tip,
  labelFontSize,
  valueFontSize,
  labelFontWeight,
  valueFontWeight,
}): JSX.Element => {
  dayjs.extend(utc);
  return (
    <Tooltip
      title={tip}
      enterDelay={500}
      leaveDelay={200}
      placement="bottom-start"
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontSize: labelFontSize ?? 12,
            fontWeight: labelFontWeight ?? 300,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: valueFontSize ?? 24,
            fontWeight: valueFontWeight ?? 500,
          }}
        >
          {prefix || ""}
          {money ? (
            Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(value || 0)
          ) : (
            <>
              {percent
                ? `${value && (value * 100).toFixed(2)}%`
                : dateType
                ? dayjs.utc(date).format("DD/MM/YYYY")
                : text || value}
            </>
          )}{" "}
          {sufix || ""}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default DisplayAmount;
