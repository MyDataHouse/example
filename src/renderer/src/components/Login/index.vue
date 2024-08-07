<template>
  <div v-if="show" class="fixed flex justify-center items-center left-0 top-0 w-screen h-screen duration-200" :class="{ 'backdrop-blur-sm': show }">
    <div ref="loginRef" class="login-container absolute min-h-96 py-6 px-6 text-left rounded-xl">
      <svg-icon
        @click="close"
        class="absolute right-2 top-4 p-3 cursor-pointer no-drag text-gray-400 hover:!text-red-500 transition-colors"
        name="guanbichuangkou"
      />
      <div class="flex flex-col justify-center items-center h-full select-none">
        <div class="flex flex-col items-center justify-center gap-2 mb-8">
          <img class="w-1/7 max-w-32" :src="logoSrc" />
          <p class="mt-1 text-[16px] font-semibold dark:text-white tracking-wide">登陆到您的账户</p>
          <span class="m-0 text-xs max-w-[90%] text-center text-[#8B8E98] tracking-wide">请注意保护您的密码，防止泄露以确保账户安全</span>
        </div>
      </div>
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium">
        <n-form-item class="!w-full" :label-props="{ className: 'text-gray-400' }" label="账号" path="username">
          <n-input class="rounded-lg text-sm py-0.5" v-model:value="formValue.username" placeholder="输入账号" />
        </n-form-item>
        <n-form-item class="!w-ful" :label-props="{ className: 'text-gray-400' }" label="密码" path="password">
          <n-input class="rounded-lg text-sm py-0.5" type="password" v-model:value="formValue.password" placeholder="输入密码" />
        </n-form-item>
        <div>
          <button
            class="login-button py-1 px-8 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            @click="submit"
          >
            登录
          </button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import lightLogo from '@renderer/assets/images/logo.svg';
import darkLogo from '@renderer/assets/images/whitelogo.svg';
import { useWindowStore } from '@renderer/store';
import type { FormRules, FormInst } from 'naive-ui';

// const props = withDefaults(defineProps<{ show: boolean }>(), { show: false });
const show = defineModel();

const theme = useWindowStore();

const logoSrc = computed(() => (theme.theme === 'dark' ? darkLogo : lightLogo));

const formValue = reactive({
  username: '',
  password: ''
});

const rules: FormRules = {
  username: {
    required: true,
    message: '请输入账号',
    trigger: ['blur', 'input']
  },
  password: { required: true, message: '请输入密码', trigger: ['blur', 'input'] }
};

const formRef = ref<FormInst | null>(null);

const message = useMessage();
const submit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((error) => {
    if (error) return;
    message.success('验证成功');
  });
};

const loginRef = ref<HTMLDivElement | null>(null);
watch(show, (nvalue) => {
  if (nvalue) {
    nextTick(() => {
      loginRef.value?.addEventListener(
        'animationend',
        () => {
          loginRef.value?.classList.remove('element-enter');
        },
        { once: true }
      );
      loginRef.value?.classList.add('element-enter');
    });
  }
});

const close = () => {
  show.value = false;
};
</script>
<style scoped lang="scss">
.login-container {
  background-color: var(--bg2);
  box-shadow: var(--box-shadow);
}
.login-button {
  background-color: var(--color);
}
</style>
