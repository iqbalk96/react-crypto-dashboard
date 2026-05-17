import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";

import { Input } from "@/shared/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";

import { Calendar } from "@/shared/components/ui/calendar";

import {
    dcaControlsSchema,
    type DCAControlsFormValues,
} from "./dca-controls.schema";

import type { DCAControlsProps } from "./dca-controls.types";

import { SUPPORTED_ASSETS } from "../../constants/supported-assets";
import { cn } from "@/lib/utils";

export function DCAControls({
    onSubmit,
}: DCAControlsProps) {
    const form =
        useForm<DCAControlsFormValues>({
            resolver:
                zodResolver(dcaControlsSchema),

            defaultValues: {
                assetId: "bitcoin",
                startDate: "2020-01-01",
                endDate: "2023-12-31",
                interval: "30",
                investmentAmount: 100,
            },
        });

    const handleSubmit = (
        values: DCAControlsFormValues
    ) => {
        onSubmit({
            assetId: values.assetId,
            startDate: values.startDate,
            endDate: values.endDate,
            intervalDays: Number(
                values.interval
            ),
            investmentAmount:
                values.investmentAmount,
        });
    };

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                    DCA Strategy Simulator
                </CardTitle>

                <CardDescription className="text-sm text-muted-foreground">
                    Simulate historical Dollar Cost
                    Averaging performance using
                    historical market data.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            handleSubmit
                        )}
                        className="space-y-6"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="assetId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Asset
                                        </FormLabel>

                                        <Select
                                            onValueChange={
                                                field.onChange
                                            }
                                            defaultValue={
                                                field.value
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Select asset" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {SUPPORTED_ASSETS.map(
                                                    (asset) => (
                                                        <SelectItem
                                                            key={asset.id}
                                                            value={asset.id}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">
                                                                    {
                                                                        asset.symbol
                                                                    }
                                                                </span>

                                                                <span className="text-muted-foreground">
                                                                    {
                                                                        asset.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="investmentAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Investment Amount
                                            (USD)
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="100"
                                                className="h-11"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            Start Date
                                        </FormLabel>

                                        <Popover>
                                            <PopoverTrigger
                                                asChild
                                            >
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "h-11 justify-start text-left font-normal",
                                                            !field.value &&
                                                            "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />

                                                        {field.value ? (
                                                            format(
                                                                new Date(
                                                                    field.value
                                                                ),
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={
                                                        field.value
                                                            ? new Date(field.value)
                                                            : undefined
                                                    }
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            field.onChange(
                                                                format(date, "yyyy-MM-dd")
                                                            );
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            End Date
                                        </FormLabel>

                                        <Popover>
                                            <PopoverTrigger
                                                asChild
                                            >
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "h-11 justify-start text-left font-normal",
                                                            !field.value &&
                                                            "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />

                                                        {field.value ? (
                                                            format(
                                                                new Date(
                                                                    field.value
                                                                ),
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={
                                                        field.value
                                                            ? new Date(field.value)
                                                            : undefined
                                                    }
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            field.onChange(
                                                                format(date, "yyyy-MM-dd")
                                                            );
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="interval"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        DCA Interval
                                    </FormLabel>

                                    <Select
                                        onValueChange={
                                            field.onChange
                                        }
                                        defaultValue={
                                            field.value
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-11">
                                                <SelectValue placeholder="Select interval" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value="1">
                                                Daily (1 Day)
                                            </SelectItem>

                                            <SelectItem value="7">
                                                Weekly (7 Days)
                                            </SelectItem>

                                            <SelectItem value="30">
                                                Monthly (30 Days)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-end pt-2">
                            <Button
                                type="submit"
                                size="lg"
                                className="h-11 min-w-[220px]"
                            >
                                Generate Simulation
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}