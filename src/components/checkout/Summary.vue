<script setup lang="ts">
    const props = defineProps<{
        formData: any
    }>();
</script>

<template>
    <section class="component-summary">
        <div class="container">
            <!-- <table class="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Telephone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {{ props.formData.firstName }} </td>
                        <td> {{ props.formData.lastName }} </td>
                        <td> {{ props.formData.address }} </td>
                        <td> {{ props.formData.email }} </td>
                        <td> {{ props.formData.telephone }} </td>
                    </tr>
                </tbody>
            </table> -->
            <table class="table">
                <thead>
                    <tr>
                        <th>Input</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{{ props.formData.firstName.value }}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{{ props.formData.lastName.value }}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{{ props.formData.address.value }}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{{ props.formData.email.value }}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{{ props.formData.telephone.value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>

</style>