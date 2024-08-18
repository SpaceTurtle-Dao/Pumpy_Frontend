<script context="module" lang="ts">
	import { toast } from 'svelte-sonner';

	export enum StatusCode {
		NotFound = 404,
		Success = 200,
		Accepted = 202,
		BadRequest = 400,
		Info,
        Loading
	}

	export const createToast = (statusCode: StatusCode,title:string,description:string,label:string,link:string) => {
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
						onClick: () => window.open(link, '_blank')
					}
				});
				break;
			}
			case StatusCode.Accepted: {
				toast.success(title, {
					description: description,
					action: {
						label: label,
						onClick: () => window.open(link, '_blank')
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
			case StatusCode.Info: {
				toast.info(title, {
					description: description
				});
				break;
			}
            case StatusCode.Loading: {
				toast.loading(title, {
					description: description
				});
				break;
			}
		}
	};
</script>
