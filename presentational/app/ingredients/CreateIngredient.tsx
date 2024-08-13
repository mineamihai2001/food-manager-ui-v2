import { inject, observer } from "mobx-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { GlobalStore } from "../../../infrastructure/store";
import { Modal, View, Text } from "react-native";
import { Divider } from "react-native-paper";
import { Button, Input } from "../../components";
import { IngredientsService } from "../../../infrastructure/services/ingredients";

interface IProps {
    globalStore?: GlobalStore;
    ingredientsService: IngredientsService;
    setMessage: Dispatch<SetStateAction<string | null>>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateIngredient: FC<IProps> = inject("globalStore")(
    observer(({ globalStore, ingredientsService, setMessage, showModal, setShowModal }) => {
        const [name, setName] = useState<string>("");
        const [errors, setErrors] = useState<{
            name: boolean;
        }>({
            name: false,
        });

        const handleCreate = async () => {
            let errs: {
                name?: boolean;
            } = {};
            if (!name) {
                errs = {
                    ...errs,
                    name: true,
                };
            }
            if (Object.keys(errs).length) {
                setErrors({
                    ...errors,
                    ...errs,
                });
                return;
            }
            const result = await ingredientsService.create(globalStore?.kitchen.id!, name);

            if (result === null) {
                setMessage("Error creating ingredient");
                return;
            }

            setMessage("Ingredient created");
            setName("");
            dismissModal();
        };

        useEffect(() => {
            if (!errors.name) return;
            setErrors({
                ...errors,
                name: false,
            });
        }, [name]);

        const dismissModal = () => {
            setShowModal(false);
        };

        return (
            <View className="bg-neutral-0 mx-6 rounded-md">
                <Text className="text-xl px-4 py-2">Details</Text>
                <Divider />
                <View className="p-4 pb-0">
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
                </View>
                <View
                    className="flex flex-row justify-center items-center pb-4"
                    style={{
                        gap: 10,
                    }}
                >
                    <Button className="w-28" onPress={dismissModal}>
                        <Text className="text-neutral-10">Cancel</Text>
                    </Button>
                    <Button className="bg-neutral-10 w-28" onPress={handleCreate}>
                        <Text className="text-neutral-0">Create</Text>
                    </Button>
                </View>
            </View>
        );
    })
);
