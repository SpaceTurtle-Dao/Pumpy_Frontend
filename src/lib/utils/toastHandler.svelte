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

	export const createToast = (statusCode: StatusCode,description:string,label:string,link:string, id:string | number) => {
		switch (statusCode) {
			case StatusCode.NotFound: {
				toast.error(description, {
                    id:id
				});
				break;
			}
			case StatusCode.Success: {
				toast.success(description, {
                    id:id,
					action: {
						label: label,
						onClick: () => window.open(link, '_blank')
					}
				});
				break;
			}
			case StatusCode.Accepted: {
				toast.success(description, {
                    id:id,
					action: {
						label: label,
						onClick: () => window.open(link, '_blank')
					}
				});
				break;
			}
			case StatusCode.BadRequest: {
				toast.error(description, {
                    id:id
				});
				break;
			}
			case StatusCode.Info: {
				toast.info(description, {
                    id:id
				});
				break;
			}
            case StatusCode.Loading: {
				toast.loading(description, {
                    id:id
				});
				break;
			}
		}
	};
</script>
