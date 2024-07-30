import { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dish } from "../../../../domain/models";
import { Step } from "./Step";

interface IProps {
    dish: Dish;
}

export const Guide: FC<IProps> = ({ dish }) => {
    const [steps, setSteps] = useState<{ id: number; done: boolean; value: string }[]>(
        dish.steps.map((s, i) => ({ id: i, done: false, value: s }))
    );

    const toggleDone = (id: number) => {
        const copy = [...steps];
        copy[id] = {
            ...copy[id],
            done: !copy[id].done,
        };
        setSteps(copy);
    };

    useEffect(() => {
        setSteps(dish.steps.map((s, i) => ({ id: i, done: false, value: s })));
    }, [dish]);

    return (
        <View
            className="px-4 pt-4 pb-8 bg-neutral-0 rounded-2xl
                flex justify-center items-start shadow shadow-neutral-10"
            style={{
                gap: 10,
            }}
        >
            <Text className="text-2xl font-bold pl-2 pb-2">Guide</Text>
            {steps.map((step, i) => {
                return (
                    <Step
                        key={`dish-${dish.id}-ingredient-${i}`}
                        step={step}
                        toggleDone={toggleDone}
                    />
                );
            })}
        </View>
    );
};
