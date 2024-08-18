<script context="module" lang="ts">
	import { toast } from 'svelte-sonner';

	enum StatusCode {
		NotFound = 404,
		Success = 200,
		Accepted = 202,
		BadRequest = 400,
		None
	}

	export const createToast = (statusCode: StatusCode,title:string,description:string,label:string,messageId:string) => {
		switch (statusCode) {
			case StatusCode.NotFound: {
				toast.error(title, {
					description: description
				});
				break;
			}
			case StatusCode.Success: {
				toast.success(title, {
					description: description,
					action: {
						label: label,
						onClick: () => window.open('https://www.ao.link/#/message/'+messageId, '_blank')
					}
				});
				break;
			}
			case StatusCode.Accepted: {
				toast.success(title, {
					description: description,
					action: {
						label: label,
						onClick: () => window.open('https://www.ao.link/#/message/'+messageId, '_blank')
					}
				});
				break;
			}
			case StatusCode.BadRequest: {
				toast.error(title, {
					description: description
				});
				break;
			}
			case StatusCode.None: {
				toast.info(title, {
					description: description
				});
				break;
			}
		}
	};
</script>
