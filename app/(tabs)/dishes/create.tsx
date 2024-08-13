import { FC, useEffect, useState } from "react";
import {
    GestureResponderEvent,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useColors } from "../../../infrastructure/hooks";
import { router } from "expo-router";
import { DishesService } from "../../../infrastructure/services/dishes";
import { inject, observer } from "mobx-react";
import { GlobalStore } from "../../../infrastructure/store";
import { BackButton, IconButton, Input } from "../../../presentational/components";
import { Feather } from "@expo/vector-icons";
import {
    DurationForm,
    ImagesForm,
    IngredientsForm,
    StepsForm,
} from "../../../presentational/app/dishes";
import { IngredientDetails, Unit } from "../../../domain/models";
import { Snackbar } from "react-native-paper";

interface IProps {
    globalStore?: GlobalStore;
}

const CreateDish: FC<IProps> = inject("globalStore")(
    observer(({ globalStore }: IProps) => {
        const colors = useColors();

        const dishesService = new DishesService();

        const [refreshing, setRefreshing] = useState<boolean>(false);

        const [name, setName] = useState<string>("");
        const [hours, setHours] = useState<string>("");
        const [minutes, setMinutes] = useState<string>("");
        const [images, setImages] = useState<string[]>([]);
        const [steps, setSteps] = useState<string[]>([]);
        const [ingredients, setIngredients] = useState<IngredientDetails[]>([]);

        const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
        const [message, setMessage] = useState<string | null>(null);
        const [errors, setErrors] = useState<{
            name: boolean;
            duration: boolean;
            ingredients: boolean;
        }>({
            name: false,
            duration: false,
            ingredients: false,
        });

        const [blur, setBlur] = useState<boolean>(false);

        const handleAddStep = () => {
            setSteps((_) => [...steps, ""]);
        };

        const handleRemoveStep = (index: number) => {
            setSteps(steps.filter((_, i) => i !== index));
        };

        const handleCreate = async () => {
            let errs: {
                name?: boolean;
                duration?: boolean;
                ingredients?: boolean;
            } = {};
            if (!name) {
                errs = {
                    ...errs,
                    name: true,
                };
            }
            if (!hours || !minutes) {
                errs = {
                    ...errs,
                    duration: true,
                };
            }
            if (!ingredients.length) {
                errs = {
                    ...errs,
                    ingredients: true,
                };
            }
            if (Object.keys(errs).length) {
                setErrors({
                    ...errors,
                    ...errs,
                });
                return;
            }

            const res = await dishesService.create(
                globalStore?.kitchen.id!,
                name,
                (Number(hours) * 60 + Number(minutes)) * 60 * 1000, // value must be in ms
                images,
                steps,
                ingredients
                    .filter((i) => i !== null)
                    .map((i) => ({
                        id: i.id,
                        unit: i.unit ?? Unit.Pieces,
                        size: i.size,
                    }))
            );
            if (res === null) {
                setMessage("Error creating dish");
                return;
            }

            setMessage("Dish created");

            router.back();
        };

        const handleBlurIngredients = (e: GestureResponderEvent) => {
            Keyboard.dismiss();
            setBlur(true);
        };

        const handleAddIngredient = (ingredient: IngredientDetails) => {
            setIngredients((_) => [...ingredients, ingredient]);
        };

        const handleRemoveIngredient = (index: number) => {
            setIngredients(ingredients.filter((_, i) => i !== index));
        };

        const handleUpdateIngredient = (index: number, ingredient: IngredientDetails) => {
            const copy = [...ingredients];
            copy[index] = ingredient;
            setIngredients(copy);
        };

        const handleDismissSnack = () => {
            setMessage(null);
        };

        useEffect(() => {
            if (!errors.name) return;
            setErrors({
                ...errors,
                name: false,
            });
        }, [name]);

        useEffect(() => {
            if (!errors.duration) return;
            setErrors({
                ...errors,
                duration: false,
            });
        }, [hours, minutes]);

        useEffect(() => {
            if (!errors.ingredients) return;
            setErrors({
                ...errors,
                ingredients: false,
            });
        }, [ingredients]);

        return (
            <TouchableWithoutFeedback onPress={handleBlurIngredients}>
                <View>
                    <ScrollView
                        className="w-full"
                        contentContainerStyle={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 40,
                            paddingBottom: 240,
                            paddingTop: 100,
                        }}
                        scrollEnabled={scrollEnabled}
                    >
                        <BackButton />
                        <View className="absolute top-10 right-4 z-100">
                            <View>
                                <IconButton
                                    className="w-10 h-10 bg-neutral-10 shadow-sm shadow-neutral-10 rounded-full"
                                    icon={() => (
                                        <Feather name="check" size={20} color={colors.neutral[0]} />
                                    )}
                                    onPress={handleCreate}
                                />
                            </View>
                        </View>
                        <KeyboardAvoidingView className="px-8 flex bg-neutral-0 rounded-lg py-8 pb-10 shadow shadow-neutral-5 h-full">
                            <Input
                                value={name}
                                onChangeText={setName}
                                placeholder="Text"
                                label="Name"
                                errorMessage={"Name length >= 3"}
                                required={true}
                                showError={(() => {
                                    return errors.name;
                                })()}
                            />
                            <DurationForm
                                hours={hours}
                                setHours={setHours}
                                minutes={minutes}
                                setMinutes={setMinutes}
                                error={(() => {
                                    return errors.duration;
                                })()}
                            />
                            <IngredientsForm
                                addIngredient={handleAddIngredient}
                                removeIngredient={handleRemoveIngredient}
                                updateIngredient={handleUpdateIngredient}
                                ingredients={ingredients}
                                blur={blur}
                                setBlur={setBlur}
                                error={errors.ingredients}
                                enableScroll={() => setScrollEnabled(true)}
                                disableScroll={() => setScrollEnabled(false)}
                            />
                            <ImagesForm />
                            <StepsForm
                                steps={steps}
                                handleAddStep={handleAddStep}
                                handleRemoveStep={handleRemoveStep}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                    <Snackbar
                        className="mb-24"
                        visible={message !== null}
                        onDismiss={handleDismissSnack}
                        action={{
                            label: "Ok",
                            onPress: handleDismissSnack,
                        }}
                    >
                        {message}
                    </Snackbar>
                </View>
            </TouchableWithoutFeedback>
        );
    })
);

export default CreateDish;
