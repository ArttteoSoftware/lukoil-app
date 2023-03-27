import React, { useCallback } from "react";
import { Field } from "formik";
import Wrapper from './Wrapper'
import * as validationsFn from "./validations";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TextInput from "./Field/TextInput";
import InputPassword from './Field/InputPassword';
import PhoneInput from "./Field/PhoneInput";
import CardInput from "./Field/CardInput";
import AnimatedTextInput from "./Field/AnimatedTextInput";
import DropDown from "./Field/DropDown";

function FormikFields({
	type,
	name: fieldName,
	validations,
	errors,
	...rest
}) {
   
	function validate(value) {
		const validationMessages = validations ? validations.map((fieldValidation) => {
						const message = validationsFn[fieldValidation.type]({
							value,
							...fieldValidation,
						});

						return {
							type: fieldValidation.type,
							message: message,
						};
					}).filter((error) => {
						if (error.message) {
							return {
								type: error.type,
								message: error.message,
							};
						}
					})
			: [];

		if (validationMessages.length) {
			return validationMessages;
		}

		return undefined;
	}

	const Component = useCallback((props) => {
            const {
                field: {
                    value
                }
            } = props;
			const handleChange = (value, name = fieldName) => props.form.setFieldValue(name, value);
            const handleBlur = () => props.form.setFieldTouched(name, true);
            
			switch (props.type) {
                
				case "text":
					return (
						<Wrapper {...props}>
							<TextInput 
                                value={value}
                                onChange={(e) => handleChange(e)}
                                onBlur={handleBlur}
                                {...props}
                            />
						</Wrapper>
					);
				case "phone":
					return (
						<Wrapper {...props}>
							<PhoneInput 
								value={value}
								onChange={(e) => handleChange(e)}
								onBlur={handleBlur}
								{...props}
							/>
						</Wrapper>
					);
				case "password":
					return (
						<Wrapper {...props}>
							<InputPassword 
								value={value}
								onChange={(e) => handleChange(e)}
								onBlur={handleBlur}
								{...props}
							/>
						</Wrapper>
				);
				case "card":
					return (
					<Wrapper {...props}>
						<CardInput 
							value={value}
							onChange={(e) => handleChange(e)}
							onBlur={handleBlur}
							{...props}
						/>
					</Wrapper>
					);
					case "anim":
						return (
							<Wrapper {...props}>
								<AnimatedTextInput 
									value={value}
									onChange={(e) => handleChange(e)}
									onBlur={handleBlur}
									{...props}
								/>
							</Wrapper>
						);
					case "dropdown":
						return (
							<Wrapper {...props}>
								<DropDown 
									value={value}
									onChange={(e) => handleChange(e)}
									{...props}
								/>
							</Wrapper>
						);

						
					
					
			}
		}, [type]
	);

	return (
		<Field
			validate={validate}
			errors={errors}
			name={fieldName}
			component={Component}
			type={type}
			{...rest}
		/>
	);
}

export default FormikFields;